import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import DevHome from "./DevHome";
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
                    <Route path="/" exact component={DevHome} />
                    <Route path="/Search" exact component={Search} />
                    <Route path="/Informationpage" exact component={Informationpage} />
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