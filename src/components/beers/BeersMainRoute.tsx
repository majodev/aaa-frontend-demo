import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";
import { observer } from "mobx-react";
import { Route, RouteComponentProps } from "react-router-dom";

import * as i18n from "../../i18n/util";
import FullScreenProgress from "../common/FullScreenProgress";
import * as CI from "../CI";
import BeersRoute from "./BeersListRoute";
import BeerDetailRoute from "./BeerDetailRoute";
import beerState from "../../state/beersState";

type IProps = RouteComponentProps<any>;
interface IState {
    isWipeDialogOpened: boolean;
}

@observer
export default class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            isWipeDialogOpened: false
        };
    }

    handleOpen = () => {
        this.setState({ isWipeDialogOpened: true });
    }

    handleClose = () => {
        this.setState({ isWipeDialogOpened: false });
    }

    render() {

        const { errorText, dismissError, loading, remainingRequests, requestCount, isRehydrated, wipe, likedBeers } = beerState;

        if (isRehydrated === false) {
            return null;
        }

        return (
            <div>

                <FullScreenProgress show={loading} />

                <CI.Header style={{ textAlign: "center", height: 110 }}>
                    <h2><i18n.FormattedMessage id="path.beers" />&nbsp;<small>({likedBeers.length} liked)</small></h2>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <small>Remaining: {remainingRequests}, Made: {requestCount}</small>
                        <mui.FlatButton secondary onTouchTap={this.handleOpen} label="Wipe" />
                    </div>
                </CI.Header>

                <mui.Snackbar
                    open={errorText !== null}
                    message={errorText ? errorText : ""}
                    action="dismiss"
                    autoHideDuration={5000}
                    onActionTouchTap={dismissError}
                    onRequestClose={dismissError}
                />

                <mui.Dialog
                    title="Wipe"
                    actions={[
                        <mui.FlatButton
                            key="cancel"
                            label="Cancel"
                            keyboardFocused={true}
                            primary={true}
                            onClick={this.handleClose}
                        />,
                        <mui.FlatButton
                            key="ok"
                            label="OK"
                            primary={true}
                            onClick={() => { wipe(); this.handleClose(); }}
                        />
                    ]}
                    modal={false}
                    open={this.state.isWipeDialogOpened}
                    onRequestClose={this.handleClose}
                >
                    Should we really wipe the local beer cache?
                </mui.Dialog>

                {/* Child Routes */}
                <Route exact path="/beers" component={BeersRoute} />
                <Route path="/beers/:id" component={BeerDetailRoute} />

            </div>
        );
    }
}
