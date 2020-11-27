import React, { Component } from 'react'
import store from '../../store';
import { Provider } from 'react-redux';
import Informationpage from '../Informationpage';

export class InformationpageDisplay extends Component {
    render() {
        return (
            <Provider store={store}>
                <Informationpage />
            </Provider>
        )
    }
}

export default InformationpageDisplay