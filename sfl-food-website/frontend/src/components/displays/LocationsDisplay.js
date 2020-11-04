import React, { Component } from 'react'
import store from '../../store';
import { Provider } from 'react-redux';
import Locations from '../Locations';

export class LocationsDisplay extends Component {
    render() {
        return (
            <Provider store={store}>
                <Locations />
            </Provider>
        )
    }
}

export default LocationsDisplay
