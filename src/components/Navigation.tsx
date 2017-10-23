import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";
import { withRouter, RouteComponentProps } from "react-router-dom";

import * as i18n from "../i18n/util";
import MenuItemLink from "./common/MenuItemLink";

type IProps = {} & i18n.InjectedIntlProps & Partial<RouteComponentProps<any>>;
interface IState {
    open: boolean;
}

@withRouter
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

        const { intl } = this.props;
        const { open } = this.state;

        const formattedText = intl!.formatMessage({ id: getI18NKeyFromPathName(this.props.location!.pathname) });

        return (
            <div>
                <mui.AppBar
                    title={formattedText}
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <mui.Drawer
                    docked={false}
                    width={200}
                    open={open}
                    onRequestChange={(isOpen) => this.setState({ open: isOpen })}
                >
                    <MenuItemLink to="/" onClick={this.handleClose}>
                        <i18n.FormattedMessage id="path.home" />
                    </MenuItemLink>

                    <MenuItemLink to="/beers" onClick={this.handleClose} title={intl!.formatMessage({ id: "path.beers" })} />

                </mui.Drawer>
            </div>
        );
    }
}


export function getI18NKeyFromPathName(pathname: string): i18n.IDS {

    if (pathname === "/") {
        return "path.home";
    }

    return "path" + pathname.split("/").join(".") as i18n.IDS;

}
