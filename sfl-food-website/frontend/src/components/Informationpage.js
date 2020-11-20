import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLocations} from '../actions/locations'
// import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";


export default class Informationpage extends Component {
    state = {
        meals: [],
        schedules: []
    };

  /*  constructor(props) {
      super(props);
      this.state = {
          hover: false,
          user: {},
          title: "",
          body: "",
          location_id: 0.0,
      }
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    addULocation: PropTypes.func.isRequired
}

onChange = e => this.setState({
    [e.target.name]: e.target.value
});

onSubmit = e => {
  e.preventDefault();

  const { user } = this.props.auth;
  this.setState({user: user})
  this.setState({location_id:})

  // make geocode API call for lat/long
  $.getJSON('http://api.positionstack.com/v1/forward?access_key=2de14d5ec4835742c7b6d339ab0b4e29&query=' + this.state.address)
      .then(({ coords }) => {
          /*
          this.setState({ 
              latitude: coords['data'][1]['latitude'],
              longitude: coords['data'][1]['longitude'] 
          });
          const { name, address, latitude, longitude, description, email, phone_number } = this.state;
          const uLocation = { user, name, address, latitude, longitude, description, email, phone_number };
          this.props.addULocation(uLocation);
          */
        /* console.log(coords['data'][1]['latitude']);
         console.log(coords['data'][1]['longitude']);
      });
}*/


    /* static propTypes = {
     locations: PropTypes.array.isRequired
 }*/
    componentDidMount(props) {

        this.makeLocationApiCall();
        this.makeScheduleApiCall();
    }

    makeLocationApiCall = searchInput => {
        var pathname = this.props.location.pathname;
        var res = pathname.split("/");
        var ID = res[2];
        this.props.setState
        var searchUrl = "http://localhost:8000/api/locationsLL/" + ID + "/";
        let currentComponent = this;
        fetch(searchUrl).then(function (response) {
            response.json().then(function (parsedJson) {
                return parsedJson;
            }).then(jsonData => {
                currentComponent.setState({meals: jsonData});
            })
        })

    };

    makeScheduleApiCall = searchInput => {
        var pathname = this.props.location.pathname;
        var res = pathname.split("/");
        var ID = res[2];
        var searchUrl = "http://localhost:8000/api/schedules/" + ID + "/";
        let currentComponent1 = this;
        fetch(searchUrl).then(function (response) {
            response.json().then(function (parsedJson) {
                console.log("response", parsedJson);
                return parsedJson;
            }).then(jsonData => {
                console.log("response2", JSON.stringify(jsonData));
                currentComponent1.setState({schedules: jsonData});
            })
        })

    };


    render() {
        const {isAuthenticated} = this.props.auth;
        const reviewForm = (
            <div className='row'>
                <form onSubmit={this.onSubmit}>
                <label style={styles.labelStyle}>
                        <h1 style={styles.headerStyle}>User Review</h1>
                    </label>
                    <label style={styles.labelStyle}>
                        Review Title:
                        <br />
                        <input 
                            type="text" 
                            name="title" 
                            maxLength="100" 
                            style={styles.inputStyle}
                            value={name}
                            onChange={this.onChange}
                        />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Review Body:
                        <br />
                        <textarea 
                            name="body"
                            value={this.state.value} 
                            onChange={this.handleChange} 
                            style={styles.inputStyle}
                        />
                        <br />
                    </label>
                    <label style={styles.bottomLabelStyle}>
                        <input 
                            type="submit" 
                            value="Submit"
                            style={styles.submitStyle}
                            onMouseEnter={toggleHover} 
                            onMouseLeave={toggleHover}
                        />
                    </label>
                </form>
            </div>
        );
        const notLoggedIn = (
            <Redirect to='/login'/>
        );
        return (

            <div className={
                styles.mainDiv
            }>


                <div>
                    <div>
                        <h2 className={
                            styles.eventHeading
                        }>
                            {
                            this.state.meals.name
                        }</h2>
                    </div>
                    <div>
                        <h4>
                            by &nbsp;
                            <a href="#">Goodman Jewish Family Services</a>
                        </h4>
                    </div>
                    <div className={
                        styles.programDescription
                    }>
                        <p> {
                            this.state.meals.description
                        } </p>
                    </div>
                    <div className={
                        styles.subHeads
                    }>
                        <h5>
                            <i className={
                                styles.helo
                            }></i>
                            <span data-translate="Services this program provides:">
                                Services this program provides:
                            </span>
                        </h5>
                        <ul className={
                            styles.listInline
                        }>
                            <li>free food drive</li>
                            <li>free grocery</li>
                        </ul>
                        <div>
                            <span>Coverage Area:
                            </span>
                            This food drive is for Broward Community
                        </div>
                    </div>

                    <div>
                        <div className={
                            styles.subHeads
                        }>Jewish Family Home Care Inc</div>
                        <div> {
                            this.state.meals.address
                        } </div>
                        <div>
                            Phone :
                            <a href="#">
                                {
                                this.state.meals.phone_number
                            }</a>
                            <br/>
                            Email :
                            <a href="#">
                                {
                                this.state.meals.email
                            }</a>
                        </div>
                    </div>
                    <div className={
                        styles.subHeads
                    }>
                        S:
                        <span>{
                            this.state.schedules.sunday
                        }</span>
                        <br/>
                        M:
                        <span>{
                            this.state.schedules.monday
                        }</span>
                        <br/>
                        T:
                        <span>{
                            this.state.schedules.tuesday
                        }</span>
                        <br/>
                        W:
                        <span>{
                            this.state.schedules.wednesday
                        }</span>
                        <br/>
                        T:
                        <span>{
                            this.state.schedules.thursday
                        }</span>
                        <br/>
                        F:
                        <span>{
                            this.state.schedules.friday
                        }</span>
                        <br/>
                        S:
                        <span>{
                            this.state.schedules.saturday
                        }</span>
                        <br/>
                    </div>
                    <div> {
                        isAuthenticated ? reviewForm : notLoggedIn
                    } 
                    </div>
                </div>


            </div>


        );
    }
}
/*const mapStateToProps = state => ({
  locations: state.locations.locations
});*/

// export default connect(mapStateToProps, { getLocations })(SearchResultsMap);
// ReactDOM.render(<Informationpage />, document.getElementById("app"));
