import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";

import MenuItemLink from "./common/MenuItemLink";

interface IProps { }
interface IState {
    open: boolean;
}

export default class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>
                <mui.AppBar
                    title="Rosenbauer"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <mui.Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <mui.AppBar
                        title="Rosenbauer"
                        showMenuIconButton={false}
                    />
                    <MenuItemLink onClick={this.handleClose} to="/" title="Home" />
                    <MenuItemLink onClick={this.handleClose} to="/feed" title="Feed" />
                </mui.Drawer>
            </div>
        );
    }

}