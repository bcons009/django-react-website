import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Locations from "./Locations";
import SearchResultsMap from "./SearchResultsMap";

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/* <Locations /> */}
                <SearchResultsMap />
            </Provider>            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));