import React, { Component } from "react";
import styles from "../mystyle.module.css";
import MapDisplay from "./displays/MapDisplay";
import Informationpage from './Informationpage.js';
import { Link } from "react-router-dom";
import { search } from '../actions/search';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import LinkButton from "./misc/LinkButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocationsLL } from "../actions/locationsLL";
import { Fragment } from "react/cjs/react.production.min";

export class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchLocation: "",
      searchDistance: 0,
      userLocation: "",
      meals: []
    };
  }
  
  static propTypes = {
    locationsLL: PropTypes.array.isRequired,
    // uLocations: PropTypes.array.isRequired,
  };

  componentDidMount() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.success.bind(this));
    }
    this.props.getLocationsLL();

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
    this.setState({
      meals: meals_results
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
                    <MapDisplay searchValue={this.state.searchValue} meals={this.state.meals}/>
                  </div>
                  {this.state.meals.map((meal, index) => (
                  <div className={styles.singleMeal} key={index}>
                    <div className={styles.singleMealContainer}>
                      <div className={styles.singleMealLeft}>
                        <h2>
                          <Link to={`/Informationpage/${meal.id}/`}>{meal.name}</Link>
                        </h2>
                        {meal.description.length < 300 ? (
                          <p>{meal.description}</p>
                        ) : (
                          <p>
                            {meal.description.substring(0, 300)}"..."{" "}
                            <Link to={`/Informationpage/${meal.id}/`}>
                              More
                            </Link>
                          </p>
                        )}
                      </div>
                      <div className={styles.singleMealRight}>
                      <div style={sstyles.buttonDivStyle}>
                      <LinkButton
                                    className="btn btn-primary btn-sm text-nowrap mx-1 rounded"
                                    to={{
                                        pathname: `/AddReview/${meal.id}`,
                                        id: meal.id,
                                    }}
                                >
                                    Add Review
                                </LinkButton>
                        </div> 
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
  //uLocations: state.uLocations.uLocations,
});

export default connect(mapStateToProps, { getLocationsLL })(
  Search
);

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
