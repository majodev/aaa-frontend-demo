import { observable, action, ObservableMap, computed } from "mobx";
import * as _ from "lodash";
import { persist, create } from "mobx-persist";
import * as localForage from "localforage";

import { IBeer } from "./IBeer";


class BeersState {
    @persist @observable remainingRequests: number = -1;
    @persist("list") @observable beers: IBeer[] = [];
    @observable selectedBeer: IBeer | null = null;
    @observable isHydrated: boolean = false;
    @persist("map") @observable commentsMap = new ObservableMap<string>();
    @persist("map") @observable private uriMap = new ObservableMap<boolean>();

    @computed get loading(): boolean {
        return _.reduce(this.uriMap.entries(), (sum, [uri, isLoading]) => {
            return sum || isLoading;
        }, false);
    }

    @action async fetchBeers() {
        this.beers = _.uniqBy([
            ...this.beers,
            ...(await this.loadBeers())
        ], "id");
    }

    @action addComment(beerId: number, comment: string) {
        this.commentsMap.set(`${beerId}`, comment);
    }

    @action deleteComment(beerId: number) {
        this.commentsMap.delete(`${beerId}`);
    }

    @action async selectBeer(idToParse: number | string) {

        const id = _.parseInt(idToParse as string);

        const cachedBeer = _.find(this.beers, { id });

        if (cachedBeer) {
            this.selectedBeer = cachedBeer;
            return;
        }

        const newBeers = await this.loadBeers(id);

        this.beers = _.uniqBy([
            ...this.beers,
            ...newBeers
        ], "id");

        this.selectedBeer = newBeers[0];
    }

    @action deselectBeer() {
        this.selectedBeer = null;
    }

    @action private async loadBeers(id?: number): Promise<IBeer[]> {

        const uri = `https://api.punkapi.com/v2/beers${id ? "/" + id : ""}`;

        if (this.uriMap.has(uri)) {
            return [];
        }

        this.uriMap.set(uri, true);

        const res = await fetch(uri);
        this.remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);
        const beers = (await res.json()) as IBeer[];

        this.uriMap.set(uri, false);

        return beers;
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