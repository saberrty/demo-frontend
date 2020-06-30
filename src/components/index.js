import React, { Component } from 'react';
import { inject, observer  } from "mobx-react";

@inject("rootStore")
@observer
class Home extends Component {
    render() {
        const { addUser } = this.props.rootStore;
        return (
            <button onClick={() => addUser()}>123</button>
        );
    }
}

export default Home;
