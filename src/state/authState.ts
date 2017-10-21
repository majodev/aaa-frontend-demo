import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import * as config from "../config";

interface ICredentials {
    accessToken: string;
    refreshToken: null;
    expiresIn: number;
    tokenType: string;
}

class AuthState {

    @persist("object") @observable credentials: ICredentials | null = null;
    @observable userUid: string | null = null;
    @observable isAuthenticated: boolean = false;
    @observable isLoading: boolean = false;
    @observable isRehydrated: boolean = false;

    @action getNewGuestAccessToken = async () => {

        if (this.isAuthenticated === true) {
            throw new Error("you are not allowed to get a new guest token again!");
        }

        console.log("auth.getNewGuestAccessToken");
        this.isLoading = true;

        try {

            const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/token`, {
                method: "POST",
                body: JSON.stringify({
                    scope: "guest",
                    grantType: "guest"
                })
            });

            if (!res.ok) {
                throw Error(`${res.status}: ${res.statusText}`);
            }

            const { accessToken, refreshToken, expiresIn, tokenType } = await res.json();

            this.credentials = {
                accessToken,
                refreshToken,
                expiresIn,
                tokenType
            };

            console.log("new accessToken: ", accessToken);

            this.isAuthenticated = true;
            this.isLoading = false;

            await this.getUserProfile();

        } catch (e) {
            console.error("getNewGuestAccessToken error", e);
            this.wipe();
        }
    }

    @action getUserProfile = async () => {

        console.log("auth.getUserProfile");
        this.isLoading = true;

        try {

            const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.credentials!.accessToken}`
                },
            });

            if (!res.ok) {
                throw Error(`${res.status}: ${res.statusText}`);
            }

            const { profile } = await res.json();

            console.log("auth.getUserProfile: success", profile);

            this.isAuthenticated = true;
            this.isLoading = false;
            this.userUid = profile.uid;

        } catch (e) {
            console.error("auth.getUserProfile error", e);
            this.wipe();
        }
    }

    @action wipe() {
        this.credentials = null;
        this.isAuthenticated = false;
        this.isLoading = false;
    }
}

// persist this mobx state through localforage
const hydrate = create({
    storage: require("localforage"),
});

const auth = new AuthState();

hydrate("auth", auth).then(() => {
    if (auth.credentials) {
        auth.getUserProfile().then(() => {
            auth.isRehydrated = true;
        });
    }
}).catch((e) => {
    // error hydrating or testing authentication. wiping store...
    auth.wipe();
    auth.isRehydrated = true;
});

// singleton, exposes an instance by default
export default auth;
