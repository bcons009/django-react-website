import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header'
import Search from './search'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

import Login from './accounts/Login';
import Register from './accounts/Register';

import Locations from "./Locations";
import SearchResultsMap from "./SearchResultsMap";

class App extends Component {
    render() {
        return ( /*

        	<Provider store={ store }>
		        <Router>
		            <Fragment>
		        		<Header />
		            	<Switch>
		            		<Route exact path="/login" component={ Login } />
		             		<Route exact path="/register" component={ Register } />
		            	</Switch>
		            	<Search />
		            </Fragment>
		        </Router> 
			// <Locations />
                	<SearchResultsMap />
	       </Provider> 
       */ )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
