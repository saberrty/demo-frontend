import React, { Component } from 'react';
import { inject, observer  } from "mobx-react";
import { Form, Input, Button, Radio } from 'antd';
import { withRouter } from "react-router-dom";
const sha1 = require("js-sha1");

const layout = {
    labelCol: {
            span: 4,
    },
    wrapperCol: {
            span: 16,
    }
};

const tailLayout = {
    wrapperCol: {
            offset: 4,
            span: 16,
    }
};

@inject("rootStore")
@withRouter
@observer
class Home extends Component {
    state = {
        isRegister: false
    }

    componentDidMount() {
        const { history } = this.props;
        const { self } = this.props.rootStore;
        if (self) {
            history.push(`/${self.id}`)
        }
    }

    onFinish = ({ username, password }) => {
        const { isRegister } = this.state;
        const { history } = this.props;
        const { login, addUser } = this.props.rootStore;
        isRegister ? addUser(username, password, history) : login(username, sha1(password), history);
    }

    onFinishFailed = errorInfo => {
        console.info('Failed:', errorInfo);
    }

    render() {
        const { isRegister } = this.state;
        return (
            <div style={{ textAlign: "center", padding: "20px 50px 20px 50px" }}>
                <Radio.Group value={isRegister} onChange={e => this.setState({ isRegister: e.target.value })}>
                    <Radio.Button value={false}>Login</Radio.Button>
                    <Radio.Button value={true}>Register</Radio.Button>
                </Radio.Group>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    style={{ marginTop: "30px" }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            { isRegister ? "Submit" : "Login" }
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Home;
