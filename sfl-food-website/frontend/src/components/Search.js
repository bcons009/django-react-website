import React, { Component } from "react";
import styles from "../mystyle.module.css";
import MapDisplay from "./displays/MapDisplay";
import Informationpage from './Informationpage.js';
import { Link } from "react-router-dom";
import LinkButton from "./misc/LinkButton";
import { search } from '../actions/search';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocationsLL } from "../actions/locationsLL";
import { Fragment } from "react/cjs/react.production.min";
import { getULocations } from "../actions/user-locations";

export class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchLocation: "",
      searchDistance: 0,
      userLocation: "",
      meals: [],
      userlocations: [],
    };
  }
  
  static propTypes = {
    locationsLL: PropTypes.array.isRequired,
    getULocations: PropTypes.func.isRequired,
    // uLocations: PropTypes.array.isRequired,
  };

  componentDidMount() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.success.bind(this));
    }
    this.props.getLocationsLL();
    this.props.getULocations();

    console.log("Hello", this.props.locationsLL);
  }


  valueChange = e => this.setState({
      searchValue: e.target.value
  })

  locationChange = e => this.setState({
      searchLocation: e.target.value
  })

  distanceChange = e => this.setState({
      searchDistance: e.target.value
  })

  getLocation = position => {
    console.log(position);
  }


  async success(pos) {
    const { latitude, longitude } = pos.coords;
    
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    const params = {
      'latitude': latitude,
      'longitude': longitude
    }

    //console.log(state.searchDistance)

    const res = await axios.get('/api/revGeocode', { params: params });
    const location = res.data['location'];


    console.log(res.data['location']);
    this.setState({ userLocation: location });
  }

  locateUser = e => {
    console.log('hi');
    if (navigator.geolocation) {
      this.setState({ searchLocation: this.state.userLocation });
     /* navigator.geolocation
        .getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          const apiKey = "2de14d5ec4835742c7b6d339ab0b4e29";
          fetch(`http://api.positionstack.com/v1/reverse?access_key=${apiKey}&query=${latitude},${longitude}&output=json`)
            .then(res => res.json())
            .then(res => getLocation);
        } function(pos) {
                console.log(pos);
                const { latitude, longitude } = pos.coords;
                console.log(latitude);
            }); */
      console.log('yay from locateUser')
    }
    else {
      alert('Your browser does not support geolocation.');
    }
  }


  onSubmit = e => {
    e.preventDefault();
    this.state.searchLocation === "" ? this.keywordSearch() : this.getSearchResults()
  };

  keywordSearch = () => {
    const meals_results = this.props.locationsLL.filter(
      (locationsLL) =>
        locationsLL.name
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
        locationsLL.description
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
    );
    const userlocation_results = this.props.uLocations.filter(location => (
      new Date(location.date).getTime() >= new Date(this.dateToday()).getTime() && (
          location.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) || 
          location.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
          location.tags.toLowerCase().includes(this.state.searchValue.toLowerCase())
      )
      )).filter(
      (uLocations) =>
      uLocations.name
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
          uLocations.description
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
          uLocations.tags
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
    );
    this.setState({
      meals: meals_results,
      userlocations : userlocation_results
    });
    document.getElementById("divmap").style.visibility = "visible";
  }

  async getSearchResults() {
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
      if (this.state.searchValue === "") {
        this.setState({
          meals: res.data
        })
      }
      else {
        this.setState({ 
          meals: res.data.filter(location => 
            location.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) || 
            location.description.toLowerCase().includes(this.state.searchValue.toLowerCase())
          ) 
        });
      }
      document.getElementById("divmap").style.visibility = "visible";
    }

  }

  dateToday = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;    // January is 0!
    let yyyy = today.getFullYear();
    if(dd<10){
            dd = '0' + dd
        } 
        if(mm<10){
            mm = '0' + mm
        } 

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  render() {
    return (
      <Fragment>
        <div className={styles.main} >
          <div className={styles.searchContainer}>
              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Search</label>
                    <input 
                      className="form-control" 
                      type="text" 
                      id="keyword" 
                      onChange={(e) => this.valueChange(e)} 
                      value={this.state.searchValue} 
                      placeholder="Enter keywords..." 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-8">
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
                    <label>-</label>
                    <input 
                      type="button" 
                      className="form-control btn btn-light" 
                      id="locateUser" 
                      onClick={e => this.locateUser(e)} 
                      value={'Find me!'} 
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
                  </div> 
                </div> 
                <button type="submit" className="btn btn-primary">Search</button>        
              </form>

              {this.state.meals ? (
                <div id="mealsContainer" className={styles.mealsContainer}>
                  <div id="divmap" className={styles.mapSection}>
                    <MapDisplay searchValue={this.state.searchValue} meals={this.state.meals} userlocations={this.state.userlocations}/>
                  </div>
                  {this.state.meals.map((meal, index) => (
                  <div className={styles.singleMeal} key={index}>
                    <div className={styles.singleMealContainer}>
                      <div className={styles.singleMealLeft}>
                        <h2>
                          <Link to={`/Informationpage/L/${meal.id}/`}>{meal.name}</Link>
                        </h2>
                        {meal.description.length < 300 ? (
                          <p>{meal.description}</p>
                        ) : (
                          <p>
                            {meal.description.substring(0, 300)}"..."{" "}
                            <Link to={`/Informationpage/L/${meal.id}/`}>
                              More
                            </Link>
                          </p>
                        )}
                      </div>
                      <div className={styles.singleMealRight}>
                        <LinkButton
                          className="btn btn-primary btn-sm text-nowrap mx-1 rounded"
                          to={{
                            pathname: `/AddReview/${meal.id}`,
                            id: meal.id,
                          }}
                        >
                          Add Review
                        </LinkButton>
                        {meal.email.includes("null") ? 
                          <p>(no email)</p> : <p>{meal.email}</p>
                        }
                        <p>{meal.phone_number}</p>
                        <a href="#">{meal.address}</a>
                      </div>
                    </div>
                  
                  </div>
                  ))}
                  {this.state.userlocations.map((meal, index) => (
                    <div className={styles.singleMeal} key={index}>
                      <div className={styles.singleMealContainer}>
                        <div className={styles.singleMealLeft}>
                          <h2>
                            <Link to={`/Informationpage/U/${meal.id}/`}>{meal.name}</Link>
                          </h2>
                          {meal.description.length < 300 ? (
                            <p>{meal.description}</p>
                          ) : (
                            <p>
                              {meal.description.substring(0, 300)}"..."{" "}
                              <Link to={`/Informationpage/U/${meal.id}/`}>
                                More
                              </Link>
                            </p>
                          )}
                        </div>
                        <div className={styles.singleMealRight}>
                          {meal.email.includes("null") ? 
                            <p>(no email)</p> : <p>{meal.email}</p>
                          }
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  locationsLL: state.locationsLL.locationsLL,
  uLocations: state.uLocations.uLocations,
});

export default connect(mapStateToProps, { getLocationsLL, getULocations })(
  Search
);