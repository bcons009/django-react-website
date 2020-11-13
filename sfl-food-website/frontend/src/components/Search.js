import React, { Component } from "react";
// import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";
import MapDisplay from "./displays/MapDisplay";
import Informationpage from './Informationpage.js';
import { Link } from "react-router-dom";

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
        var searchUrl = `http://localhost:8000/api/locations/`;
        /*fetch(searchUrl)
          .then(response => {
           
            //alert(JSON.stringify(response)) ;
            var jsondata = "{\"meals\": [{\"eventid\": \"52955\",\"eventName\": \"Free give away\",\"eventAddress\": \"123 Vermont St, Weston, FL\",\"eventDate\": \"12/10/2020\"},{\"eventid\": \"52355\",\"eventName\": \"YMCA Food Drive\",\"eventAddress\": \"1464 Nashville St, Miami, FL\",\"eventDate\": \"11/21/2020\"},{\"eventid\": \"555\",\"eventName\": \"Publix Food Drive\",\"eventAddress\": \"21 Baker St, Cooper city, FL\",\"eventDate\": \"10/29/2020\"}]}";
            document.getElementById("divmap").style.visibility = "visible";
            return JSON.parse(jsondata);
          })
          .then(jsonData => {
           // alert("meaks"+meals);
            console.log("OK",JSON.stringify(jsonData.meals));
            this.setState({ meals: jsonData.meals });
          });*/
          let currentComponent = this;
          fetch(searchUrl).then(function(response) {
            response.json().then(function(parsedJson) {
            document.getElementById("divmap").style.visibility = "visible";
            return parsedJson;
              
            })
            .then(jsonData  => {
              currentComponent.setState({ meals: jsonData  });
            });
          })
         
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
                  <Link to={`/Informationpage/${meal.id}/`}>{meal.name}</Link>
                </h2>
                <p>
                  {meal.description}
                </p>
                <p>
                  <b>Serving </b>: {meal.cost}
                </p>
              </div>
              <div className={styles.singleMealRight}>
                <p>{meal.email}</p>
                <p>{meal.phone_number}</p>
                <a href="#">{meal.address}</a>
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