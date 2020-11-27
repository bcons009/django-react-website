import React, { Component } from "react";
// import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";
import MapDisplay from "./displays/MapDisplay";
import Informationpage from './Informationpage.js';
import { Link } from "react-router-dom";
import { search } from '../actions/search';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import LinkButton from "./misc/LinkButton";

export default class Search extends Component {

  state = {
    searchValue: "hi",
    searchLocation: "Miami, FL 33129",
    searchDistance: 0,
    meals: []
  };


  valueChange = e => this.setState({
      searchValue: e.target.value
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

    // ***********WILL NEED TO ADD SEARCH VALUE***********
    const params = {
      'location': this.state.searchLocation,
      'distance': this.state.searchDistance
    }

    //console.log(this.state.searchDistance)

    const res = await axios.get('/api/geocode', { params: params });
    //console.log(res.data);
    if(res.data === 'no results'){
      alert('No results. Please try again.');
    }
    else {
      this.setState({ meals: res.data });
    }

  }

  /*  
  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };
  
  makeApiCall = searchInput => {
    var searchUrl = `http://localhost:8000/api/locations/`;
    fetch(searchUrl)
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
      });
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
  */


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
                    onChange={(e) => this.valueChange(e)} 
                    //value={this.state.searchValue} 
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
                    //value={this.state.searchLocation} 
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
                      <div style={sstyles.buttonDivStyle}>
                                <LinkButton
                                    className="btn btn-primary btn-sm"
                                    to={{
                                        pathname: `/AddReview/${location.id}`,
                                        id: location.id,
                                    }}
                                >
                                    Add Review
                                </LinkButton>
                            </div>                            
                        
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
      </div>
    );
  }
}

{/*ReactDOM.render(<Search />, document.getElementById("app"));*/} 


const sstyles = {
  outerDivStyle: {
      width: "60%",
      height: "90%",
      margin: "50px auto",
      backgroundColor: "#F5F5F5",
      border: "3px solid #4286f4",
      borderRadius: "10px"
  },
  formStyle: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      justifyContent: "space-evenly",
      alignItems: "center"
  },
  labelStyle: {
      width: "60%",
      height: "100%",
      margin: "30px auto 0px",
      fontSize: "1.2em"
  },
  bottomLabelStyle: {
      width: "60%",
      height: "100%",
      margin: "30px auto"
  },
  inputStyle: {
      margin: "10px 0",
      width: "100%"
  },
  descriptionStyle: {
      margin: "10px 0",
      width: "100%",
      resize: "none"
  },
  timeDivStyle: {
      display: "flex",
      justifyContent: "space-between",
      margin: "10px 0 0",
  },
  startTimeDivStyle: {
      width: "90%",
      margin: "0 10px 0 0",
      fontSize: "0.8em"
  },
  endTimeDivStyle: {
      width: "90%",
      margin: "0 0 0 10px",
      fontSize: "0.8em"
  },
  timeStyle: {
      width: "100%",
      margin: "0"
  },
  submitStyle: {
      width: "100%",
      margin: "0 auto 30px",
      borderColor: "#4286f4",
      color: "white",
      backgroundColor: "#4286f4",
      transition: "color 0.3s, background-color 0.3s"
  },
  headerStyle: {
      margin: "0"
  },
  addressDivStyle: {
      fontSize: "0.8em"
  },
  stateDivStyle: {
      fontSize: "1.2em",
      fontWeight: "bold",
      margin: "10px 0"
  },
}
