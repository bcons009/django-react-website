import React, { Component } from "react";
// import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";
import MapDisplay from "./displays/MapDisplay";
import Informationpage from './Informationpage.js';
import { Link } from "react-router-dom";
import { search } from '../actions/search';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';

export default class Search extends Component {

  state = {
    searchValue: "",
    searchLocation: "",
    searchDistance: 0,
    meals: []
  };


  onChange = e => this.setState({
      [e.target.name]: e.target.value
  });

  locationChange = e => this.setState({
      searchLocation: e.target.value
  });

  distanceChange = e => this.setState({
      searchDistance: e.target.value
  });

  onSubmit = e => {
    e.preventDefault();

    this.getResults();
  };

  async getResults() {
    // Headers
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    // Request Body
    // ***********WILL NEED TO ADD SEARCH VALUE***********
    const body = {
      'location': this.state.searchLocation,
      'distance': this.state.searchDistance
    }

    console.log(this.state.searchDistance)

    let res = await axios.post('/api/geocode', body, config)
    console.log(`${res.data}`);
  }


  /*
  makeApiCall = searchInput => {
    var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        //return response.json();
        var jsondata = "{\"meals\": [{\"eventid\": \"52955\",\"eventName\": \"Free give away\",\"eventAddress\": \"123 Vermont St, Weston, FL\",\"eventDate\": \"12/10/2020\"},{\"eventid\": \"52355\",\"eventName\": \"YMCA Food Drive\",\"eventAddress\": \"1464 Nashville St, Miami, FL\",\"eventDate\": \"11/21/2020\"},{\"eventid\": \"555\",\"eventName\": \"Publix Food Drive\",\"eventAddress\": \"21 Baker St, Cooper city, FL\",\"eventDate\": \"10/29/2020\"}]}";
        document.getElementById("divmap").style.visibility = "visible";
        return JSON.parse(jsondata);
      })
      .then(jsonData => {
        this.setState({ meals: jsonData.meals });
      });
  }; */

  render() {
    return (
      <div className={styles.main} >
        <div className={styles.searchContainer}>
          <h1>South Florida Free Food</h1>

          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Search</label>
                <input 
                  className="form-control" 
                  type="text" 
                  id="keyword" 
                  onChange={(e) => this.onChange(e)} 
                  value={this.state.searchValue} 
                  placeholder="Enter keywords..." 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-10">
                <label>Location</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="location" 
                  onChange={(e) => this.locationChange(e)} 
                  value={this.state.searchLocation} 
                  placeholder="Enter address, zip, etc."
                />
              </div>
              <div className="form-group col-md-2">
                <label>Distance (miles)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="distance" 
                  onChange={(e) => this.distanceChange(e)} 
                  //value={this.state.searchDistance} 
                  aria-describedby="distanceHelp" 
                  placeholder="Near Me" 
                />
                <small id="distanceHelp" className="form-text text-muted">...or simply search "Near Me"</small>
              </div> 
            </div> 
            <button type="submit" className="btn btn-primary">Search</button>        
          </form>


          
        </div>
        {this.state.meals ? (
        <div className={styles.mealsContainer}>
          <div id="divmap" className={styles.mapSection}>
            {/*
              <img
                width="90%"
                src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
                alt="meal-thumbnail"
              />
            */}
            <MapDisplay />
          </div>
          {this.state.meals.map((meal, index) => (
          <div className={styles.singleMeal} key={index}>
            <div className={styles.singleMealContainer}>
              <div className={styles.singleMealLeft}>
                <h2>
                  <Link to="/Informationpage"><a href="#">{meal.eventName}</a></Link>
                </h2>
                <p>
                  Weston food drive serves everyone
                  from low income families, single parents, senior citizens,
                  unemployed individuals, disabled veterans
                </p>
                <p>
                  <b>Serving </b>: anyone in need, all ages
                </p>
              </div>
              <div className={styles.singleMealRight}>
                <p>11.11 miles (serves your local area)</p>
                <a href="#">{meal.eventAddress}</a>
              </div>
            </div>
           
          </div>
          ))}
        </div>
        ) : (
            <p>Try searching for a meal</p>
          )}
      </div>
    );
  }
}

// ReactDOM.render(<Search />, document.getElementById("app"));