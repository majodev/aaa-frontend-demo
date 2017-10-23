import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";

import * as i18n from "../i18n/util";
import MenuItemLink from "./common/MenuItemLink";

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
                    <MenuItemLink to="/" onClick={this.handleClose} title="Home" />
                    {/* <StyledLink to="/"><mui.MenuItem onClick={this.handleClose}>Home</mui.MenuItem></StyledLink> */}
                    <MenuItemLink to="/beers" onClick={this.handleClose} title="Beers" />
                    {/* <StyledLink to="/beers"><mui.MenuItem onClick={this.handleClose}>Beers</mui.MenuItem></StyledLink> */}
                </mui.Drawer>
            </div>
        );
    }
}
