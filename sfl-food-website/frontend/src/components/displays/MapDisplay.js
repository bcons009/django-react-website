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
                <div style={{width: "100%", height: "100%"}}>
                    <SearchResultsMap searchValue={this.props.searchValue} meals={this.props.meals} userlocations={this.props.userlocations} />
                </div>
            </Provider>
        )
    }
}

export default MapDisplay