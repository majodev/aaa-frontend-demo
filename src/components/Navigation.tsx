import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";
import { withRouter, RouteComponentProps } from "react-router-dom";

import * as i18n from "../i18n/util";
import MenuItemLink from "./common/MenuItemLink";

type IProps = i18n.InjectedIntlProps & Partial<RouteComponentProps<any>>;
interface IState {
    open: boolean;
}

function pathnameToI18NString(pathname: string): i18n.IDS {
    // if we only receive "/", we are that main page!
    if (pathname === "/") {
        return "path.home";
    }

    // else we need to parse and replace the path segments according to our spec
    // however, we lose compile time safety here.
    return `path${pathname.split("/").join(".")}` as i18n.IDS;
}

@i18n.injectIntl
@withRouter
export default class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });

    render() {

        const { intl, location } = this.props!;
        const brandText = intl!.formatMessage({ id: "nav.brand" });
        const routeText = intl!.formatMessage({ id: pathnameToI18NString(location!.pathname) });

        return (
            <div>
                <mui.AppBar
                    title={routeText}
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
                        <i18n.FormattedMessage id="path.home" />
                    </MenuItemLink>
                    <MenuItemLink onClick={this.handleClose} to="/feed">
                        <i18n.FormattedMessage id="path.feed" />
                    </MenuItemLink>
                </mui.Drawer>
            </div>
        );
    }

}