import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import LandingPage from './LandingPage'
import Search from "./Search";
import MapDisplay from "./displays/MapDisplay";
import LocationsDisplay from "./displays/LocationsDisplay";
import UserAccounts from './UserAccounts';
import AddEventPage from './user-events/AddEventPage'
import Informationpage from "./Informationpage";

import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/LandingPage" exact component={LandingPage} />
                    <Route path="/Search" exact component={Search} />
                    <Route path="/Map" component={MapDisplay} />
                    <Route path="/Locations" component={LocationsDisplay} />
                    <Route path="/UserAccounts" component={UserAccounts} />
                    <Route path="/AddEventPage" component={AddEventPage} />
                    <Route path="/Informationpage" exact component={Informationpage} />
                </Switch>
            </Router>
        )
    }
}