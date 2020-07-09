import React, { Component } from 'react';
import { inject, observer  } from "mobx-react";
import { withRouter } from "react-router-dom";
import { List, Button } from "antd";

@inject("rootStore")
@withRouter
@observer
class Account extends Component {
    componentDidMount() {
        const { history } = this.props;
        const { getUsers, self } = this.props.rootStore;
        if (!self) {
            history.push("/")
        } else {
            getUsers();
        }
    }

    render() {
        const { deleteUser, users } = this.props.rootStore;
        return (
            <List
                dataSource={users}
                renderItem={u => (
                    <List.Item>
                        {u.username}
                        <Button onClick={() => deleteUser(u.username)}>Delete</Button>
                    </List.Item>
                )}
            />
        );
    }
}

export default Account;
