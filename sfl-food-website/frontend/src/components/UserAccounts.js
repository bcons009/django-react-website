import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

import Header from './layout/Header';

import Login from './accounts/Login';
import Register from './accounts/Register';


export default class UserAccounts extends Component {
    render() {
        return (
        	<Provider store={ store }>
		        <Router>
		            <Fragment>
		        		<Header />
		            	<Switch>
		            		<Route exact path="/login" component={ Login } />
		             		<Route exact path="/register" component={ Register } />
		            	</Switch>
		            </Fragment>
		        </Router> 
	       </Provider> 
        )
    }
}