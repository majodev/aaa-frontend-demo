import { observable, action } from "mobx";
import * as _ from "lodash";
import { persist, create } from "mobx-persist";
import * as localForage from "localforage";

import { IBeer } from "./IBeer";


class BeersState {
    @persist @observable remainingRequests: number = -1;
    @persist("list") @observable beers: IBeer[] = [];
    @observable loading: boolean = false;
    @observable selectedBeer: IBeer | null = null;
    @observable isHydrated: boolean = false;

    @action async fetchBeers() {
        this.loading = true;
        const res = await fetch("https://api.punkapi.com/v2/beers");
        this.remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);
        this.beers = (await res.json()) as IBeer[];
        this.loading = false;
    }

    @action async selectBeer(idToParse: number | string) {

        const id = _.parseInt(idToParse as string);

        const cachedBeer = _.find(this.beers, { id });

        if (cachedBeer) {
            this.selectedBeer = cachedBeer;
            return;
        }

        this.loading = true;
        const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
        this.remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);
        const newBeers = await res.json();
        this.beers = [
            ...this.beers,
            ...newBeers
        ];
        this.loading = false;

        this.selectedBeer = newBeers[0];
    }

    @action deselectBeer() {
        this.selectedBeer = null;
    }
}

const hydrate = create({
    storage: localForage,
});

export const beersState = new BeersState();

hydrate("beersState", beersState).then(() => {

    beersState.isHydrated = true;
    console.log("beersState hydrated");

}).catch((e) => {

    console.error("beersState hydrated error", e);
    beersState.isHydrated = true;
});


export default beersState;