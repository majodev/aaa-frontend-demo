import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react";

import beerState from "../../state/beersState";

interface IState { }

@observer
export default class Component extends React.Component<RouteComponentProps<{ id: string }>, IState> {

    componentDidMount() {
        beerState.selectBeer(this.props.match.params.id);
    }

    componentWillUnmount() {
        beerState.deselectBeer();
    }

    render() {

        const { selectedBeer } = beerState;

        return (
            <div>
                <pre>{JSON.stringify(selectedBeer, null, 2)}</pre>
            </div>
        );
    }
}
