import React, { Component } from 'react'
import store from '../../store';
import { Provider } from 'react-redux';
import SearchResultsMap from '../SearchResultsMap';

export class MapDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <SearchResultsMap searchValue={this.props.searchValue} />
                </div>
            </Provider>
        )
    }
}

export default MapDisplay