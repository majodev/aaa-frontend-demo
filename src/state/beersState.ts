import { observable, action } from "mobx";
import * as _ from "lodash";

import { IBeer } from "./IBeer";

class BeersState {

    @observable loading: boolean = false;
    @observable beers: IBeer[] = [];
    @observable remainingRequests: number = 0;
    @observable selectedBeer: IBeer | null = null;

    @action loadBeers = async () => {
        if (this.loading || this.beers.length > 0) {
            // noop if we are loading or have already loaded our beers
            return;
        }

        this.loading = true;
        
        const res = await fetch(`https://api.punkapi.com/v2/beers`);
        this.beers = await res.json();
        this.remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);

        this.loading = false;
    }

    @action selectBeer = async (id: number) => {

        const beer = _.find(this.beers, { id });

        if (beer) {
            // beer was already loaded, noop.
            this.selectedBeer = beer;
            return;
        }

        this.loading = true;
        const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
        const [ newBeer ] = await res.json();
        this.remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);
        
        // update our collection.
        this.beers = [
            ...this.beers,
            newBeer
        ];

        this.selectedBeer = newBeer;
        this.loading = false;
    }

}

// singleton, expose an instance by default
export default new BeersState();
