import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/Header';

import Login from './accounts/Login';
import Register from './accounts/Register';


class App extends Component {
    render() {
        return (
	        <Router>
	            <Fragment>
	        		<Header />
	            	<Switch>
	            		<Route exact path="/login" compenent={Login} />
	             		<Route exact path="/register" compenent={Register} />
	            	</Switch>
	            </Fragment>
	        </Router>   
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));