import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";
import * as _ from "lodash";
import { RouteComponentProps } from "react-router-dom";

import { IBeer } from "./IBeer";
import * as i18n from "../../i18n/util";

type IProps = RouteComponentProps<any>;
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
                <mui.List>
                    {_.map(this.state.beers, (beer) => {
                        return (
                            <mui.ListItem
                                key={beer.id}
                                onTouchTap={() => this.props.history.push(`/beers/${beer.id}`)}
                                primaryText={beer.name}
                                secondaryText={<p>
                                    <span style={{ color: "#111" }}>{beer.tagline}</span><br />{beer.description}
                                </p>
                                }
                                secondaryTextLines={2}
                            />
                        );
                    })}
                </mui.List>
            </div>
        );
    }
}

