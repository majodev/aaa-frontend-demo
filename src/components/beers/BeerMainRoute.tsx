import * as React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { observer } from "mobx-react";

import * as i18n from "../../i18n/util";
import BeersRoute from "./Beers";
import BeerDetailRoute from "./BeerDetailRoute";
import { beersState } from "../../state/beersState";

interface IProps { }
interface IState { }

@observer
export default class Component extends React.Component<IProps, IState> {

    render() {

        if (beersState.isHydrated === false) {
            return null;
        }

        return (
            <div>
                <Route exact path="/beers" component={BeersRoute} />
                <Route path="/beers/:id" component={BeerDetailRoute} />
            </div>
        );
    }
}
