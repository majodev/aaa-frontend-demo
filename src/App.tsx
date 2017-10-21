import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { IntlProvider } from "react-intl";
import { HashRouter as Router, Route, } from "react-router-dom";

import muiTheme from "./muiTheme";
import baseLocale from "./i18n/en";
import Main from "./components/Main";
import BeersMainRoute from "./components/beers/BeersMainRoute";
import Navigation from "./components/Navigation";

// Needed for onTouchTap click handlers 
// see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <IntlProvider locale="en" messages={baseLocale}>
                    <Router>
                        <div>
                            <Navigation />
                            <Route exact path="/" component={Main} />
                            <Route path="/beers" component={BeersMainRoute} />
                        </div>
                    </Router>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
