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
            user: {},
            name: "",
            address: "",
            latitude: 0.0,
            longitude: 0.0,
            description: "",
            email: "",
            phone_number: ""
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
               console.log(coords['data'][1]['latitude']);
               console.log(coords['data'][1]['longitude']);
            });
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { name, address, latitude, longitude, description, email, phone_number } = this.state;        

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
                        <input 
                            type="text" 
                            name="address" 
                            maxLength="250"
                            style={styles.inputStyle}
                            value={address}
                            onChange={this.onChange}
                        />
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
        margin: "30px auto 0px"
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
    }
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addULocation })(AddEventForm);
