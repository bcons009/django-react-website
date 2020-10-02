import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Locations from "./Locations";

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <h1>Hello World</h1>
                <Locations />
            </Provider>            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));