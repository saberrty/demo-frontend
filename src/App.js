import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { inject, observer  } from "mobx-react";
import { Spin } from "antd";
import Home from "./components";
import Account from "./components/account";

@inject("rootStore")
@observer
class App extends Component {
    componentDidMount() {
        if (localStorage.getItem("sessionId")) {
            const { authSession } = this.props.rootStore;
            this.props.rootStore.setLoading(true);
            authSession().finally(() => this.props.rootStore.setLoading(false));
        }
    }

    render() {
        const { loading } = this.props.rootStore;
        return (
            loading ?  <Spin /> : <BrowserRouter>
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
