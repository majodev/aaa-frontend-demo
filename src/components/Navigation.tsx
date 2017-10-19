import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";

import * as i18n from "../i18n/util";
import MenuItemLink from "./common/MenuItemLink";

interface IProps { }
interface IState {
    open: boolean;
}

@i18n.injectIntl
export default class Component extends React.Component<IProps & i18n.InjectedIntlProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });

    render() {

        const brandText = this.props.intl!.formatMessage({ id: "nav.brand" });

        return (
            <div>
                <mui.AppBar
                    title={brandText}
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <mui.Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <mui.AppBar
                        title={brandText}
                        showMenuIconButton={false}
                    />
                    <MenuItemLink onClick={this.handleClose} to="/">
                        <i18n.FormattedMessage id="nav.home" />
                    </MenuItemLink>
                    <MenuItemLink onClick={this.handleClose} to="/feed">
                        <i18n.FormattedMessage id="nav.feed" />
                    </MenuItemLink>
                </mui.Drawer>
            </div>
        );
    }

}