import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";

import * as i18n from "../../i18n/util";

type IProps = RouteComponentProps<{ id: string }>;
interface IState { }

export default class Component extends React.Component<IProps, IState> {
    render() {
        return (
            <h2>Beer detail for beer id: {this.props.match.params.id}</h2>
        );
    }
}
