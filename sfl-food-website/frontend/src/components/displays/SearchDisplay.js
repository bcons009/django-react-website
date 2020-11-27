import React, { Component } from 'react'
import store from '../../store';
import { Provider } from 'react-redux';
import Search from '../Search';

export class SearchDisplay extends Component {
    render() {
        return (
            <Provider store={store}>
                <Search location={this.props.location} />
            </Provider>
        )
    }
}

export default SearchDisplay