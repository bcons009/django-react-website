import React, { Component } from "react";
// import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";
import {Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Informationpage from './Informationpage.js';

export default class Search extends Component {

    state = {
        searchValue: "",
        meals: []
      };
    
      handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
      };
    
      handleSearch = () => {
        this.makeApiCall(this.state.searchValue);
      };
    
      makeApiCall = searchInput => {
        var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        fetch(searchUrl)
          .then(response => {
            //return response.json();
            var jsondata = "{\"meals\": [{\"eventid\": \"52955\",\"eventName\": \"Free give away\",\"eventAddress\": \"123 Vermont St, Weston, FL\",\"eventDate\": \"12/10/2020\"},{\"eventid\": \"52355\",\"eventName\": \"YMCA Food Drive\",\"eventAddress\": \"1464 Nashville St, Miami, FL\",\"eventDate\": \"11/21/2020\"},{\"eventid\": \"555\",\"eventName\": \"Publix Food Drive\",\"eventAddress\": \"21 Baker St, Cooper city, FL\",\"eventDate\": \"10/29/2020\"}]}";
            document.getElementById("divmap").style.display = "inline";
            return JSON.parse(jsondata);
          })
          .then(jsonData => {
            this.setState({ meals: jsonData.meals });
          });
      };
  render() {
    return (
      <div className={styles.main} >
        <div className={styles.searchContainer}>
          <h1>South Florida Free Food</h1>
          <input name="text" type="text" onChange={event => this.handleOnChange(event)} value={this.state.searchValue} placeholder="Search" />
          <button onClick={this.handleSearch}>Search</button>
          
        </div>
        {this.state.meals ? (
        <div className={styles.mealsContainer}>
          <div id="divmap" className={styles.mapSection}>
            <img
              width="90%"
              src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
              alt="meal-thumbnail"
            />
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