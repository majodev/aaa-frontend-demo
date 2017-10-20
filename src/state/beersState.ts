import { observable, action } from "mobx";
import { IBeer } from "./IBeer";

class BeersState {

    @observable loading: boolean = false;
    @observable beers: IBeer[] = [];
    @observable remainingRequests: number = 0;

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

}

// singleton, expose an instance by default
export default new BeersState();
