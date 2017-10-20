import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react";
import * as mui from "material-ui";
import * as _ from "lodash";

import * as primitives from "../util/primitives";
import beerState from "../../state/beersState";

type IProps = RouteComponentProps<{ id: string }>;
interface IState { }

@observer
export default class Component extends React.Component<IProps, IState> {

    componentDidMount() {
        beerState.selectBeer(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            beerState.selectBeer(nextProps.match.params.id);
        }
    }

    componentWillUnmount() {
        beerState.deselectBeer();
    }

    navLeft = () => {
        if (beerState.selectedBeer!.id !== 1) {
            this.props.history.push(`/beers/${beerState.selectedBeer!.id - 1}`);
        }
    }

    navRight = () => {
        this.props.history.push(`/beers/${beerState.selectedBeer!.id + 1}`);
    }

    render() {

        const { selectedBeer, toggleLikeBeer, isLikedBeer } = beerState;

        let beerDetail = null;

        if (selectedBeer) {
            beerDetail = (
                <mui.Card>
                    <mui.CardHeader
                        title={selectedBeer.name}
                        titleStyle={{ fontWeight: 300, fontSize: 32 }}
                        subtitle={<div>
                            <p>{selectedBeer.tagline}</p>
                            <p><small>Contributed by {selectedBeer.contributed_by}</small></p>
                        </div>}
                        avatar={
                            <mui.Avatar size={100} style={{ overflow: "hidden" }}>
                                <img src={selectedBeer.image_url} style={{ maxWidth: 100, maxHeight: 100 }} />
                            </mui.Avatar>}
                    />
                    <mui.CardText>
                        <h5>Best with</h5>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {_.map(selectedBeer.food_pairing, (pairing, index) => {
                                return (
                                    <mui.Chip key={index}>{pairing}</mui.Chip>
                                );
                            })}
                        </div>
                        <h5>Description</h5>
                        <p>{selectedBeer.description}</p>
                        <h5>Tips</h5>
                        <p>{selectedBeer.brewers_tips}</p>
                    </mui.CardText>
                    <mui.CardActions>
                        <mui.FlatButton
                            onTouchTap={toggleLikeBeer.bind(this, selectedBeer.id)}
                            secondary={isLikedBeer(selectedBeer.id) ? true : false}
                            icon={<primitives.IconThumbUp />}
                        />
                    </mui.CardActions>
                </mui.Card>
            );
        }

        return (
            <div style={{ padding: 10, paddingBottom: 30 }}>

                {beerDetail}

                <mui.FloatingActionButton
                    disabled={this.props.match.params.id === "1" || beerState.loading}
                    onTouchTap={this.navLeft}
                    mini
                    secondary
                    style={{ position: "fixed", right: 55, bottom: 10 }}
                >
                    <primitives.IconLeft />
                </mui.FloatingActionButton>
                <mui.FloatingActionButton
                    disabled={beerState.loading}
                    onTouchTap={this.navRight}
                    mini
                    style={{ position: "fixed", right: 10, bottom: 10 }}
                >
                    <primitives.IconRight />
                </mui.FloatingActionButton>
                {/* <pre>{JSON.stringify(selectedBeer, null, 2)}</pre> */}
            </div>
        );
    }
}
