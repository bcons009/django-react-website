import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
import { getULocations, deleteULocation } from '../../actions/user-locations'

export class ViewYourEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            del_popup: false,
            del_id: 0
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        uLocations: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.props.getULocations();
    }

    timeConvert(m_time) {
        const nums = m_time.split(":");
        let hours = parseInt(nums[0]);

        const suffix = hours >= 12 ? "pm":"am"; 
        hours = ((hours + 11) % 12 + 1);
        const time = hours.toString() + ":" + nums[1] + suffix
        return time;
    }

    dateConvert(s_date) {
        const values = s_date.split("-");
        let month = values[1];
        let day = values[2];
        let year = values[0];

        // months switch case
        switch(month) {
            case "01":
                month = "January";
                break;
            case "02":
                month = "February";
                break;
            case "03":
                month = "March";
                break;
            case "04":
                month = "April";
                break;
            case "05":
                month = "May";
                break;
            case "06":
                month = "June";
                break;
            case "07":
                month = "July";
                break;
            case "08":
                month = "August";
                break;
            case "09":
                month = "September";
                break;
            case "10":
                month = "October";
                break;
            case "11":
                month = "November";
                break;
            case "12":
                month = "December";
                break;
            default:
                month = month;
                break;
        }

        const date = month + " " + day + ", " + year;
        return date;
    }

    set_delete_popup(id) {
        this.setState({ 
            del_popup: true,
            del_id: id
        });
    }

    delete_loc(id) {
        this.setState({ 
            del_popup: true,
            del_id: 0
        });
        this.props.deleteULocation(id);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        let msg = null;
        const events = this.props.uLocations.filter(location => location.user === user.id);
        if (events.length === 0) {
            msg = <div style={styles.nullMsgStyle}>No events to display...</div>;
        }

        const loggedIn = (
            <div>
                <h1 style={styles.headerStyle}>{ user ? `${user.username}'s Events:` : `` }</h1>
                { msg }

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Event Confirmation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this event?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={this.delete_loc.bind(this, this.state.del_id)}
                            >
                                Delete
                            </button>
                        </div>
                        </div>
                    </div>
                </div>

                { this.props.uLocations.filter(location => location.user === user.id).map(location => (
                    <div 
                        key={location.id}
                        style={styles.outerDivStyle}
                    >
                        <div style={styles.titleBarStyle}>
                            <h2 style={styles.nameStyle}>{location.name}</h2>
                            <div style={styles.buttonDivStyle}>
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-sm"
                                    
                                >
                                    Edit Listing
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal" 
                                    data-target="#exampleModal"
                                    onClick={this.set_delete_popup.bind(this, location.id)}
                                >
                                    Delete Listing
                                </button>
                            </div>                            
                        </div>
                        <hr style={styles.hrStyle}/>
                        <h3 style={styles.addrStyle}>{location.address}</h3>
                        <h3 style={styles.h3Style}>{this.dateConvert(location.date)}</h3>
                        <h3 style={styles.h3Style}>{this.timeConvert(location.start_time)} - {this.timeConvert(location.end_time)}</h3>
                        <br />
                        <p style={styles.descStyle}>{location.description}</p>
                        <hr style={styles.hrStyle}/>
                        <p style={styles.contactStyle}>Contact Info:</p>
                        Phone Number: <a href={"tel:" + location.phone_number}>{location.phone_number}</a>
                        <br />
                        Email: <a href={"mailto:" + location.email}>{location.email}</a>
                    </div>
                )) }
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
        width: "80vw",
        margin: "50px auto",
        backgroundColor: "#F5F5F5",
        border: "3px solid #4286f4",
        borderRadius: "10px",
        padding: "30px"
    },
    nameStyle: {
        fontSize: "2.25rem",
        fontWeight: "bold",
        margin: "0",
        width: "100%"
    },
    hrStyle: {
        borderTop: "1px solid rgba(0, 0, 0, .3)"
    },
    addrStyle: {
        fontWeight: "400"
    },
    h3Style: {
        fontSize: "1.3rem",
        fontWeight: "400"
    },
    descStyle: {
        marginTop: "0",
        marginBottom: "1rem",
        padding: "5px",
        borderRadius: "5px",
        fontWeight: "500",
        fontSize: "1.1rem",
        margin: "0"
    },
    contactStyle: {
        fontSize: "1.1rem",
        fontWeight: "600"
    },
    headerStyle: {
        margin: "30px 0 60px 9.5vw",
        fontSize: "3.5em"
    },
    titleBarStyle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonDivStyle: {
        width: "60%",
        display: "flex",
        justifyContent: "flex-end"
    },
    nullMsgStyle : {
        width: "100%",
        textAlign: "center",
        fontSize: "3rem",
        opacity: "0.3"
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    uLocations: state.uLocations.uLocations,
});

export default connect(mapStateToProps, { getULocations, deleteULocation, })(ViewYourEvents);
