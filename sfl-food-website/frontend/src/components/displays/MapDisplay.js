import React, { Component } from 'react'
import store from '../../store';
import { Provider } from 'react-redux';
import SearchResultsMap from '../SearchResultsMap';

export class MapDisplay extends Component {
    render() {
        return (
            <Provider store={store}>
                <SearchResultsMap />
            </Provider>
        )
    }
}

export default MapDisplay
