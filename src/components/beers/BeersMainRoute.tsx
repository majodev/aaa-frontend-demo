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

interface IState { }

@observer
export default class Component extends React.Component<RouteComponentProps<any>, IState> {
    render() {

        const { errorText, dismissError, loading, remainingRequests, requestCount } = beerState;

        return (
            <div>

                <FullScreenProgress show={loading} />

                <CI.Header style={{ textAlign: "center", height: 110 }}>
                    <h2><i18n.FormattedMessage id="path.beers" />&nbsp;</h2>
                    <small>Remaining: {remainingRequests}, Made: {requestCount}</small>
                </CI.Header>

                <mui.Snackbar
                    open={errorText !== null}
                    message={errorText ? errorText : ""}
                    action="dismiss"
                    autoHideDuration={5000}
                    onActionTouchTap={dismissError}
                    onRequestClose={dismissError}
                />

                {/* Child Routes */}
                <Route exact path="/beers" component={BeersRoute} />
                <Route path="/beers/:id" component={BeerDetailRoute} />

            </div>
        );
    }
}
