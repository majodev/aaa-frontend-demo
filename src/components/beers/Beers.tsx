import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";
import * as _ from "lodash";
import { RouteComponentProps } from "react-router-dom";

import * as i18n from "../../i18n/util";
import { beersState } from "../../state/beersState";
import { observer } from "mobx-react";
import FullScreenProgress from "../common/FullScreenProgress";

type IProps = RouteComponentProps<any>;
interface IState { }

@observer
export default class Component extends React.Component<IProps, IState> {

    componentDidMount() {
        beersState.fetchBeers();
    }

    render() {

        return (
            <div>
                <FullScreenProgress show={beersState.loading} />

                <h1>Beers {beersState.remainingRequests}</h1>
                <mui.List>
                    {_.map(beersState.beers, (beer) => {
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

