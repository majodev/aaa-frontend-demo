import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";

import * as i18n from "../../i18n/util";
import { beersState } from "../../state/beersState";

type IProps = RouteComponentProps<{ id: string }>;
interface IState { }

@observer
export default class Component extends React.Component<IProps, IState> {

    componentDidMount() {
        beersState.selectBeer(this.props.match.params.id);

        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        beersState.deselectBeer();
    }

    render() {
        return (
            <div>
                <h2>Beer detail for beer id: {this.props.match.params.id}</h2>
                <pre>{JSON.stringify(beersState.selectedBeer, null, 2)}</pre>
            </div>
        );
    }
}
