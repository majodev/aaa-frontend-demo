import * as React from "react";
import styled from "styled-components";

import { IBeer } from "./IBeer";
import * as i18n from "../../i18n/util";

interface IProps { }
interface IState {
    remainingRequests: number;
    beers: IBeer[];
}

export default class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            remainingRequests: -1,
            beers: []
        };
    }

    componentDidMount() {
        this.fetchBeers();
    }

    async fetchBeers() {
        const res = await fetch("https://api.punkapi.com/v2/beers");

        const remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);
        const json = (await res.json()) as IBeer[];

        this.setState({
            remainingRequests,
            beers: json
        });
    }

    render() {
        return (
            <div>
                <h1>Beers {this.state.remainingRequests}</h1>
                <ul>
                    {this.state.beers.map((beer) => {
                        return (
                            <li key={beer.id}>{beer.name}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

