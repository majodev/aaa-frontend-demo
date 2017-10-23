import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as mui from "material-ui";

import * as i18n from "../i18n/util";

const StyledLink = styled(Link) `
    text-decoration: none;
`;

interface IProps { }
interface IState {
    open: boolean;
}

export default class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>
                <mui.AppBar
                    title="Title"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <mui.Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <StyledLink to="/"><mui.MenuItem onClick={this.handleClose}>Home</mui.MenuItem></StyledLink>
                    <StyledLink to="/beers"><mui.MenuItem onClick={this.handleClose}>Beers</mui.MenuItem></StyledLink>
                </mui.Drawer>
            </div>
        );
    }
}
