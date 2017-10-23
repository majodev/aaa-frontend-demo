import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";

import * as i18n from "../i18n/util";
import MenuItemLink from "./common/MenuItemLink";

type IProps = {} & i18n.InjectedIntlProps;
interface IState {
    open: boolean;
}

@i18n.injectIntl
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
                    <MenuItemLink to="/" onClick={this.handleClose}>
                        <i18n.FormattedMessage id="nav.home" />
                    </MenuItemLink>

                    <MenuItemLink to="/beers" onClick={this.handleClose} title={this.props.intl!.formatMessage({ id: "nav.beers" })} />

                </mui.Drawer>
            </div>
        );
    }
}
