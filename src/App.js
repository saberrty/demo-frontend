import React, { Component } from 'react';
import { apiCommon } from "./common/api";

export default class App extends Component {
    sendMessage = () => {
        apiCommon.requestData({
            method: "get",
            url: "/users/users_list"
        }).then(({ data }) => console.info(data));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button onClick={this.sendMessage}>123</button>
                </header>
            </div>
        );
    }
}
