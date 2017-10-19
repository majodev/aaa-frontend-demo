import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

interface IState { }

export default class Component extends React.Component<RouteComponentProps<{ id: string }>, IState> {
    render() {
        return (<small>beerdetail: id {this.props.match.params.id}</small>);
    }
}
