import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import * as mui from "material-ui";
import * as _ from "lodash";
import { observer } from "mobx-react";

import * as primitives from "../util/primitives";
import beerState from "../../state/beersState";
import muiTheme from "../../muiTheme";

interface IState { }

@observer
export default class Component extends React.Component<RouteComponentProps<null>, IState> {

    constructor(props: RouteComponentProps<null>) {
        super(props);
    }

    componentDidMount() {
        beerState.loadBeers();
    }

    render() {

        const { beers, isLikedBeer } = beerState;

        return (
            <div>
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
                                rightIcon={isLikedBeer(beer.id) ? <primitives.IconThumbUp color={muiTheme.palette!.accent1Color} style={{ top: 18 }} /> : undefined}
                            />
                        );
                    })}
                </mui.List>
            </div>
        );
    }
}
