import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import * as mui from "material-ui";
import * as _ from "lodash";

import * as i18n from "../../i18n/util";
import FullScreenProgress from "../common/FullScreenProgress";
import { IBeer } from "./IBeer";
import * as CI from "../CI";

interface IState {
    remainingRequests: number;
    loading: boolean;
    beers: IBeer[];
}

export default class Component extends React.Component<RouteComponentProps<null>, IState> {

    constructor(props: RouteComponentProps<null>) {
        super(props);

        this.state = {
            remainingRequests: 0,
            loading: true,
            beers: []
        };
    }

    componentDidMount() {
        this.fetchBeers();
    }

    fetchBeers = async () => {
        const res = await fetch(`https://api.punkapi.com/v2/beers`);
        const beers: IBeer[] = await res.json();
        const remainingRequests = Number.parseInt(res.headers.get("x-ratelimit-remaining") as string);

        this.setState({
            loading: false,
            remainingRequests,
            beers
        });
    }

    render() {

        const { beers, loading, remainingRequests } = this.state;

        return (
            <div>
                <FullScreenProgress show={loading} />
                <CI.Header style={{ textAlign: "center", height: 110 }}>
                    <h2><i18n.FormattedMessage id="path.beers" />&nbsp;</h2>
                    <small>Remaining: {remainingRequests}</small>
                </CI.Header>
                <mui.List>
                    {_.map(beers, (beer) => {
                        return (
                            <mui.ListItem
                                key={beer.id}
                                primaryText={beer.name}
                                secondaryText={
                                    <p>
                                        <span style={{ color: "#333" }}>{beer.tagline}</span><br />
                                        {beer.description}
                                    </p>
                                }
                                secondaryTextLines={2}
                                onTouchTap={() => { this.props.history.push(`/beers/${beer.id}`); }}
                            />
                        );
                    })}
                </mui.List>
            </div>

        );
    }
}
