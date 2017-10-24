import { observable, action } from "mobx";
import { IBeer } from "./IBeer";

class BeersState {
    @observable remainingRequests: number = -1;
    @observable beers: IBeer[] = [];
    @observable loading: boolean = false;

    @action async fetchBeers() {
        this.loading = true;
        const res = await fetch("https://api.punkapi.com/v2/beers");
        this.remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);
        this.beers = (await res.json()) as IBeer[];
        this.loading = false;
    }
}

export const beersState = new BeersState();
export default beersState;