import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import * as mui from "material-ui";
import * as _ from "lodash";
import { observer } from "mobx-react";

import * as i18n from "../../i18n/util";
import FullScreenProgress from "../common/FullScreenProgress";
import * as CI from "../CI";
import beerState from "../../state/beersState";

interface IState {}

@observer
export default class Component extends React.Component<RouteComponentProps<null>, IState> {

    constructor(props: RouteComponentProps<null>) {
        super(props);
    }

    componentDidMount() {
        beerState.loadBeers();
    }

    render() {

        const { beers, loading, remainingRequests, requestCount } = beerState;

        return (
            <div>
                <FullScreenProgress show={loading} />
                <CI.Header style={{ textAlign: "center", height: 110 }}>
                    <h2><i18n.FormattedMessage id="path.beers" />&nbsp;</h2>
                    <small>Remaining: {remainingRequests}, Made: {requestCount}</small>
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
