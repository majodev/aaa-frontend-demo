import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { IntlProvider } from "react-intl";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";

import BeersRoute from "./components/beers/Beers";
import muiTheme from "./muiTheme";
import baseLocale from "./i18n/en";
import Main from "./components/Main";

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
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/beers">Beers</Link></li>
                            </ul>
                            <Route exact path="/" component={Main} />
                            <Route path="/beers" component={BeersRoute} />
                        </div>
                    </Router>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
