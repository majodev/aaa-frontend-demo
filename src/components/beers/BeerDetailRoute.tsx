import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react";

import FullScreenProgress from "../common/FullScreenProgress";
import beerState from "../../state/beersState";

interface IState { }

@observer
export default class Component extends React.Component<RouteComponentProps<{ id: string }>, IState> {

    componentDidMount() {
        beerState.selectBeer(Number.parseInt(this.props.match.params.id));
    }

    render() {

        const { selectedBeer, loading } = beerState;

        return (
            <div>
                <FullScreenProgress show={loading} />
                <pre>{JSON.stringify(selectedBeer, null, 2)}</pre>
            </div>
        );
    }
}
