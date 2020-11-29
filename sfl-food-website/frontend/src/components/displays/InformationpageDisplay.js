import React, { Component } from 'react'
import store from '../../store';
import { Provider } from 'react-redux';
import Informationpage from '../Informationpage';

export class InformationpageDisplay extends Component {
    render() {
        return (
            <Provider store={store}>
                <Informationpage location={this.props.location} />
            </Provider>
        )
    }
}

export default InformationpageDisplay