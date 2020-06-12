import React, { Component } from 'react';
import { Api } from "./common/api";

export default class App extends Component {
    sendMessage = () => {
        Api.request({
            method: "post",
            url: "/users/delete_user",
            data: {
                id: 10
            }
        })
        // apiCommon.requestData({
        //     method: "get",
        //     url: "/users/users_list"
        // }).then(({ data }) => console.info(data));
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
