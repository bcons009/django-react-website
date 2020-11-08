import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Search from "./Search";
import MapDisplay from "./displays/MapDisplay";
import LocationsDisplay from "./displays/LocationsDisplay";
import UserAccounts from './UserAccounts';

import history from './history';
import Informationpage from "./Informationpage";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Search" exact component={Search} />
                    <Route path="/Informationpage" exact component={Informationpage} />
                    <Route path="/Map" component={MapDisplay} />
                    <Route path="/Locations" component={LocationsDisplay} />
                    <Route path="/UserAccounts" component={UserAccounts} />
                </Switch>
            </Router>
        )
    }
}