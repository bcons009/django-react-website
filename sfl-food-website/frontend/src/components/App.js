import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import UserAccounts from './UserAccounts'

class App extends Component {
    render() {
        return (
            <UserAccounts />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));