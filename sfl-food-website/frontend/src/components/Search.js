import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styles from "../mystyle.module.css";
import PropTypes from "prop-types";
import { getLocationsLL } from '../actions/locationsLL'
import MapDisplay from "./displays/MapDisplay";
//import { getSchedules } from '../actions/schedules'
import { Link } from "react-router-dom";
import LinkButton from "./misc/LinkButton";

export class Search extends Component {
  static propTypes = {
    locationsLL: PropTypes.array.isRequired,
  };
  state = {
    searchValue: "",
    //meals: []
  };

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    console.log("button click","")
    this.props.getLocationsLL();
    //document.getElementById("divmap").style.visibility = "visible";

  };
  

  render() {
    return (
      <Fragment>
        <div className={styles.main}>
          <div className={styles.searchContainer}>
            <h1>South Florida Free Food</h1>
            <input
              name="text"
              type="text"
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.searchValue}
              placeholder="Search"
            />
            <button onClick={this.handleSearch}>Search</button>
          </div>
          {this.props.locationsLL ? (
            <div className={styles.mealsContainer}>
              <div id="divmap" className={styles.mapSection}>
                
                <MapDisplay />
              </div>
              {this.props.locationsLL.filter(locationsLL =>locationsLL.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) || locationsLL.description.toLowerCase().includes(this.state.searchValue.toLowerCase())).map((location, index) => (
              <div className={styles.singleMeal} key={index}>
                <div className={styles.singleMealContainer}>
                  <div className={styles.singleMealLeft}>
                    <h2>
                   
                      <Link to={`/Informationpage/${location.id}`}>{location.name}</Link>
                    </h2>
                    { location.description.length<300 ?
                    (<p>
                      {location.description}
                    </p>)
                    : (<p>{location.description.substring(0, 300)}"..." <Link to={`/Informationpage/${location.id}`}>More</Link></p>)}
                    <p>
                      <b>Serving </b>: {location.cost}
                    </p>
                  </div>
                  <div className={styles.singleMealRight}>
                    <p>{location.email}</p>
                    <p>{location.phone_number}</p>
                    <a href="#">{location.address}</a>
                    <p><LinkButton
                    
                    to={{
                        pathname: `/Informationpage/${location.id}`,
                        id: location.id,
                    }}
                >
                    Edit Listing
                </LinkButton></p>
                  </div>
                </div>
               
              </div>
              ))}
            </div>
            ) : (
                <p>Try searching for a event</p>
              )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  locationsLL: state.locationsLL.locationsLL
  // 1st locations = reducer
  //schedules: state.schedules.locations
});

export default connect(mapStateToProps, { getLocationsLL })(Search);
