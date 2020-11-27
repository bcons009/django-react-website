import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styles from "../mystyle.module.css";
import PropTypes from "prop-types";
import { getLocationsLL } from "../actions/locationsLL";
import { getULocations } from "../actions/user-locations";
import MapDisplay from "./displays/MapDisplay";
import Informationpage from "./Informationpage.js";
import { Link } from "react-router-dom";

export class Search extends Component {
  static propTypes = {
    locationsLL: PropTypes.array.isRequired,
    // uLocations: PropTypes.array.isRequired,
  };
  state = {
    searchValue: "",
    //meals: []
  };
  componentDidMount(props) {
    this.props.getLocationsLL();

    console.log("Hello", this.props.locationsLL);
    this.props.getULocations();
    console.log("Hello", this.props.uLocations);
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.props.getLocationsLL();
    this.props.getULocations();
    console.log(this.props);
    console.log(this.state);
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
                {/*
                      <img
                        width="90%"
                        src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
                        alt="meal-thumbnail"
                      />
                    */}
                <MapDisplay />
              </div>
              {this.props.locationsLL
                .filter(
                  (locationsLL) =>
                    locationsLL.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    locationsLL.description
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase())
                )
                .map((location, index) => (
                  <div className={styles.singleMeal} key={index}>
                    <div className={styles.singleMealContainer}>
                      <div className={styles.singleMealLeft}>
                        <h2>
                          <Link to={`/Informationpage/${location.id}/`}>
                            {location.name}
                          </Link>
                        </h2>
                        {location.description.length < 300 ? (
                          <p>{location.description}</p>
                        ) : (
                          <p>
                            {location.description.substring(0, 300)}"..."{" "}
                            <Link to={`/Informationpage/${location.id}/`}>
                              More
                            </Link>
                          </p>
                        )}
                        <p>
                          <b>Serving </b>: {location.cost}
                        </p>
                      </div>
                      <div className={styles.singleMealRight}>
                        <p>{location.email}</p>
                        <p>{location.phone_number}</p>
                        <a href="#">{location.address}</a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p>Try searching for a event</p>
          )}
          <div>
            {this.props.uLocations &&
              this.props.uLocations
                .filter(
                  (uLocations) =>
                    uLocations.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    uLocations.description
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase())
                )
                .map((location, index) => (
                  <div className={styles.singleMeal} key={index}>
                    <div className={styles.singleMealContainer}>
                      <div className={styles.singleMealLeft}>
                        <h2>
                          <Link to={`/Informationpage/${location.id}/`}>
                            {location.name}
                          </Link>
                        </h2>
                        {location.description.length < 300 ? (
                          <p>{location.description}</p>
                        ) : (
                          <p>
                            {location.description.substring(0, 300)}"..."{" "}
                            <Link to={`/Informationpage/${location.id}/`}>
                              More
                            </Link>
                          </p>
                        )}
                        <p>
                          <b>Serving </b>: {location.cost}
                        </p>
                      </div>
                      <div className={styles.singleMealRight}>
                        <p>{location.email}</p>
                        <p>{location.phone_number}</p>
                        <a href="#">{location.address}</a>
                      </div>
                    </div>
                  </div>
                ))}
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

export default connect(mapStateToProps, { getLocationsLL, getULocations })(
  Search
);
