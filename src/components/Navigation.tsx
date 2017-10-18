import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";
import { Link, Router, RouteComponentProps } from "react-router-dom";

interface IProps { }
interface IState {
    open: boolean;
}

const StyledLink = styled(Link) `
    text-decoration: none;
`;

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
                    <StyledLink to="/">
                        <mui.MenuItem onClick={this.handleClose}>Home</mui.MenuItem>
                    </StyledLink>
                    <StyledLink to="/feed">
                        <mui.MenuItem onClick={this.handleClose}>Feed</mui.MenuItem>
                    </StyledLink>
                </mui.Drawer>
            </div>
        );
    }

}