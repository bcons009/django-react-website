import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AddReviewForm from './AddReviewForm'
import UserAccounts from './UserAccounts'
import { Provider } from 'react-redux';
import store from '../store'

import Header from './layout/Header';

import Login from './accounts/Login';
import Register from './accounts/Register';

export default class AddReview extends Component {
    render() {
        return (
            <div>
                <Provider store={ store }>
                    <Router>
                        <AddReviewForm />
                    </Router> 
                </Provider>               
            </div>
        )
    }
}