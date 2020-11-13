import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addULocation } from '../../actions/user-locations';
import { Redirect } from "react-router-dom";

export class AddEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            user: "",
            name: "",
            address: "",
            city: "",
            zip_code: "",
            latitude: 0.0,
            longitude: 0.0,
            description: "",
            date: "",
            start_time: "",
            end_time: "",
            email: "",
            phone_number: ""
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        addULocation: PropTypes.func.isRequired
    }

    dateMin = () => {
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

    dateMax = () => {
        let today_y = new Date();
        let dd = today_y.getDate();
        let mm = today_y.getMonth() + 1;    // January is 0!
        let yyyy = today_y.getFullYear() + 1;
        if(dd<10){
                dd = '0' + dd
            } 
            if(mm<10){
                mm = '0' + mm
            } 

        today_y = yyyy + '-' + mm + '-' + dd;
        return today_y;
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    onDateChange = e => {
        const date = new Date(e.target.value);

        const today = this.dateMin();
        const today_d = new Date(today);
        const today_y = this.dateMax();
        const today_yd = new Date(today_y)

        if (today_d.getTime() <= date.getTime() && date.getTime() <= today_yd.getTime()) {
            this.setState({ date: e.target.value })
        }
        else {
            if (date.getTime() < today_d.getTime()) {
                this.setState({ date: today })
            }
            else if (date.getTime() > today_yd.getTime()) {
                this.setState({ date: today_y })
            }
            else {
                this.setState({ date: e.target.value })
            }
        }
    }

    validateInputs = () => {
        const { name, address, city, zip_code, date, start_time, end_time, description, email, phone_number } = this.state;
        if (!name || !address || !city || !zip_code || !date || !start_time || !end_time || !description || !email || !phone_number) {
            return false;
        }
        else {
            return true;
        }
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.validateInputs()) {
            let { user } = this.props.auth;
            user = user.id
            this.setState({user: user});

            // formatting address for use in API call url
            let addr = this.state.address + ", " + this.state.city + ", " + this.state.zip_code;
            this.setState({address: addr});
            addr = addr.replace(/ /g, "%20");
            addr = addr.replace(/,/g, "%2C");

            // make geocode API call for lat/long
            const url_s = 'http://api.positionstack.com/v1/forward?access_key=2de14d5ec4835742c7b6d339ab0b4e29&query=' + addr;
            console.log(url_s);
            fetch(url_s)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    
                    this.setState({ 
                        latitude: response['data'][1]['latitude'],
                        longitude: response['data'][1]['longitude'] 
                    });
                    const { name, address, latitude, longitude, date, start_time, end_time, description, email, phone_number } = this.state;
                    const uLocation = { user, name, address, latitude, longitude, date, start_time, end_time, description, email, phone_number };
                    this.props.addULocation(uLocation);
                    console.log(uLocation);

                    alert("Event has been successfully created!");

                    // redirect
                    window.location.href = '#';
                })
                .catch(err => alert(err));
        }
        else {
            alert("Please make sure to fill out all fields before submitting.");
        }            
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { name, address, city, zip_code, date, start_time, end_time, description, email, phone_number } = this.state;     

        const toggleHover = () => {
            this.setState({hover: !this.state.hover})

            if (this.state.hover) {
                styles.submitStyle = {
                    width: "100%",
                    margin: "0 auto 30px",
                    borderColor: "#4286f4",
                    color: "white",
                    backgroundColor: "#4286f4",
                    transition: "color 0.3s, background-color 0.3s"
                }
            }
            else {
                styles.submitStyle = {
                    width: "100%",
                    margin: "0 auto 30px",
                    borderColor: "#4286f4",
                    color: "#4286f4",
                    backgroundColor: "white",
                    transition: "color 0.3s, background-color 0.3s"
                }
            }
        }

        const loggedIn = (
            <div style={styles.outerDivStyle}>
                <form style={styles.formStyle} onSubmit={this.onSubmit}>
                    <label style={styles.labelStyle}>
                        <h1 style={styles.headerStyle}>Add Event</h1>
                    </label>
                    <label style={styles.labelStyle}>
                        Event Name:
                        <br />
                        <input 
                            type="text" 
                            name="name" 
                            maxLength="100" 
                            style={styles.inputStyle}
                            value={name}
                            onChange={this.onChange}
                        />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Event Address:
                        <br />
                        <div style={styles.addressDivStyle}>
                            Street Address
                            <br />
                            <input 
                                type="text" 
                                name="address" 
                                maxLength="250"
                                style={styles.inputStyle}
                                value={address}
                                onChange={this.onChange}
                            />
                            City
                            <br />
                            <input 
                                type="text" 
                                name="city" 
                                maxLength="100"
                                style={styles.inputStyle}
                                value={city}
                                onChange={this.onChange}
                            />
                            <br />
                            <div style={styles.stateDivStyle}>State: Florida</div>
                            Zip Code
                            <input 
                                type="text" 
                                name="zip_code" 
                                maxLength="11"
                                style={styles.inputStyle}
                                value={zip_code}
                                onChange={this.onChange}
                            />
                        </div>                        
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Description:
                        <br />
                        <textarea 
                            name="description" 
                            rows="8" 
                            cols="55"
                            style={styles.descriptionStyle}
                            value={description}
                            onChange={this.onChange}
                        />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Date:
                        <br />
                            <input 
                                type="date" 
                                name="date" 
                                style={styles.inputStyle}
                                value={date}
                                onChange={this.onDateChange}
                            />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Time:
                        <br />
                        <div style={styles.timeDivStyle}>
                            <div style={styles.startTimeDivStyle}>
                                Start Time
                                <input 
                                    type="time" 
                                    name="start_time"
                                    style={styles.timeStyle}
                                    value={start_time}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div style={styles.endTimeDivStyle}>
                                End Time
                                <input 
                                    type="time" 
                                    name="end_time"
                                    style={styles.timeStyle}
                                    value={end_time}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Contact Phone Number:
                        <br />
                        <input 
                            type="tel" 
                            name="phone_number" 
                            maxLength="250" 
                            pattern="[0-9]{10}" 
                            placeholder="1235556789"
                            style={styles.inputStyle}
                            value={phone_number}
                            onChange={this.onChange}
                        />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Contact Email Address:
                        <br />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="johndoe@gmail.com"
                            style={styles.inputStyle}
                            value={email}
                            onChange={this.onChange}
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
            <Redirect to='/login' />
        );

        return (
            <div>
                { isAuthenticated ? loggedIn : notLoggedIn }
            </div>            
        )
    }
}

const styles = {
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
    }
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addULocation })(AddEventForm);
