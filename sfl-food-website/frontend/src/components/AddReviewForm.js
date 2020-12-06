import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
import { addReview } from '../actions/reviews';
import { getULocations } from '../actions/user-locations';
import { getLocationsLL } from '../actions/locationsLL';



export class AddReviewForm extends Component {

    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            hover: false,
            user: "",
            title: "",
            review: "",
            rating: 1,
            is_loading: false,
            onClickId: this.props.match.params.id ,
           // onClickId: "",
            location: this.props.match.params.id,
            //location: "",
        }
    }

    

    static propTypes = {
        auth: PropTypes.object.isRequired,
        addReview: PropTypes.func.isRequired
    }

    componentDidMount(){
       // this.props.getULocations();
        // some function that runs after getULocations that sets the state to the values
        // of each input field to the record whose ID matches the event ID passed in
        console.log(this.props.match.params.id)
        const { isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            //const eULocation = this.props.uLocations.find(location => location.id === this.state.onClickId);
            console.log("hello")
           // console.log(eULocation)
           // let { location } = eULocation;
           // location = location.id
           // this.setState({location: location});
        }
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    /*validateInputs = () => {
        const { title, review, rating } = this.state;
        if (!title || !review || !rating) {
            return false;
        }
        else {
            return true;
        }
    }*/

    onSubmit = e => {
        e.preventDefault();

        //if (this.validateInputs()) {
            this.setState({is_loading: true});
            this.setState({hover: false});

            let { user } = this.props.auth;
            user = user.id
            this.setState({user: user});

            const { title,review,rating,location } = this.state;
            const aReview = { user, title, review, rating };
            
            //this.props.addReview(aReview, this.state.onClickId);
            this.props.addReview(aReview);
            console.log(aReview);

            alert("Event has been successfully updated!");

                // redirect
            window.location.href = '#';
                  
        //}
        //else {
        //    alert("Please make sure to fill out all fields before submitting.");
        //}            
    }
   
    render() {
        const { isAuthenticated } = this.props.auth;
        const { title,review,rating } = this.state;   

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

        let submitButton = this.state.is_loading ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : (
            <input 
                type="submit" 
                value="Submit"
                style={styles.submitStyle}
                onMouseEnter={toggleHover} 
                onMouseLeave={toggleHover}
            />
        );


        const loggedIn = (
            <div style={styles.outerDivStyle}>
                <form style={styles.formStyle} onSubmit={this.onSubmit}>
                    <label style={styles.labelStyle}>
                        <h1 style={styles.headerStyle}>Add Review</h1>
                    </label>
                    <label style={styles.labelStyle}>
                        Review Title:
                        <br />
                        <input 
                            type="text" 
                            name="title" 
                            maxLength="100" 
                            style={styles.inputStyle}
                            value={title}
                            onChange={this.onChange}
                            required
                        />
                        <br />
                    </label>
                   <label style={styles.labelStyle}>
                        Review description:
                        <br />
                        <textarea 
                            name="review" 
                            rows="8" 
                            cols="55"
                            style={styles.descriptionStyle}
                            value={review}
                            onChange={this.onChange}
                            required
                        />
                        <br />
                        
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Rating:
                        <select 
                            name="rating"
                            value={rating} 
                            onChange={this.onChange} 
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <br />
                            
                        <br />
                    </label>
                    <label style={styles.bottomLabelStyle}>
                        {submitButton}
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

export default connect(mapStateToProps, {addReview})(AddReviewForm);