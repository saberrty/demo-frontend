import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components";
import Account from "./components/account";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/:userId" component={Account} />
                    <Redirect to="/404" />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
