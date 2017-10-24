import { observable, action } from "mobx";
import * as _ from "lodash";

import { IBeer } from "./IBeer";


class BeersState {
    @observable remainingRequests: number = -1;
    @observable beers: IBeer[] = [];
    @observable loading: boolean = false;
    @observable selectedBeer: IBeer | null = null;

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

export const beersState = new BeersState();
export default beersState;