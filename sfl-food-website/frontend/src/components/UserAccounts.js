import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

import Header from './layout/Header';
import Login from './accounts/Login';
import Register from './accounts/Register';

import DevHome from "./DevHome";
import Home from "./Home";
import Search from "./Search";
import MapDisplay from "./displays/MapDisplay";
import LocationsDisplay from "./displays/LocationsDisplay";
import AddEventForm from './user-events/AddEventForm'
import InformationpageDisplay from "./displays/InformationpageDisplay";
import ViewYourEvents from './user-events/ViewYourEvents';
import EditEventForm from './user-events/EditEventForm'
import AddReviewForm from './AddReviewForm'

import history from './history';

export default class UserAccounts extends Component {
    render() {
        return (
        	<Provider store={ store }>
		        <Router history={history}>
		            <Fragment>
		        		<Header />
		            	<Switch>
		            		<Route exact path="/login" component={ Login } />
		             		<Route exact path="/register" component={ Register } />
							<Route path="/" exact component={Home} />
							<Route path="/Search" exact component={Search} />
							<Route path="/Map" component={MapDisplay} />
							<Route path="/Locations" component={LocationsDisplay} />
							<Route path="/UserAccounts" component={UserAccounts} />
							<Route path="/AddEventPage" component={AddEventForm} />
							<Route path="/Informationpage/:id" exact component={InformationpageDisplay} />
							<Route path="/ViewYourEvents" exact component={ViewYourEvents} />
							<Route path="/EditEventForm/:id" component={EditEventForm} />
							<Route path="/DevHome" exact component={DevHome} />
							<Route path="/Informationpage/U/:id" exact component={InformationpageDisplay} />
							<Route path="/Informationpage/L/:id" exact component={InformationpageDisplay} />
							<Route exact path="/AddReview/:id" component={AddReviewForm} />
		            	</Switch>
		            </Fragment>
		        </Router> 
	       </Provider> 
        )
    }
}