import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
import { getULocations, deleteULocation } from '../../actions/user-locations'
import LinkButton from "../misc/LinkButton";

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

    splitTags = tags => {
        let tags_str = tags.replace(/^\|+|\|+$/g, '');
        tags_str = tags_str.replace(/\|\|/g, ", ");
        return tags_str
    }

    handleAdd = () => {
        window.location.href = '#/AddEventPage';
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        let msg1 = null;
        let msg2 = null;
        let events_new = [];
        let events_old = [];
        if (isAuthenticated) {
            events_new = this.props.uLocations.filter(location => (
                        location.user === user.id
                    )).filter(location => (
                        new Date(location.date).getTime() >= new Date(this.dateToday()).getTime()
                    ));
            events_old = this.props.uLocations.filter(location => (
                        location.user === user.id
                    )).filter(location => (
                        new Date(location.date).getTime() < new Date(this.dateToday()).getTime()
                    ));
        }
        if (events_new.length === 0) {
            msg1 = <div style={styles.nullMsgStyle}>No events to display...</div>;
        }
        if (events_old.length === 0) {
            msg2 = <div style={styles.nullMsgStyle}>No events to display...</div>;
        }

        const loggedIn = (
            <div>
                <div style={styles.headerDivStyle}>
                    <h1 style={styles.headerStyle}>{ user ? `${user.username}'s Events:` : `` }</h1>
                    <button 
                        type="button" 
                        class="btn btn-success btn-lg rounded m-4 text-nowrap"
                        onClick={this.handleAdd}
                    >
                        Create New Event
                    </button>
                </div>
                <div style={styles.pDivStyle}>
                    <p style={styles.pStyle}>User-created events do not necessarily need to give away food, so long as they are charitable in nature and give away something of use for <strong>free</strong> to anyone interested.</p>
                    <p style={styles.pStyle}>Please note that we do not allow any users of South Florida Free Food to use events advertised on this site to turn a profit. Any users caught using events they have created to scam others is subject to a ban from using this site.</p>
                    <p style={styles.pStyle}>Misleading events or events unrelated to charity work are subject to removal from the South Florida Free Food site.</p>
                </div>
                { msg1 }

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
                            <button type="button" className="btn btn-secondary mx-1 rounded" data-dismiss="modal">Cancel</button>
                            <button 
                                type="button" 
                                className="btn btn-danger mx-1 rounded"
                                data-dismiss="modal"
                                onClick={this.delete_loc.bind(this, this.state.del_id)}
                            >
                                Delete
                            </button>
                        </div>
                        </div>
                    </div>
                </div>

                { this.props.uLocations.filter(location => (
                    location.user === user.id
                )).filter(location => (
                    new Date(location.date).getTime() >= new Date(this.dateToday()).getTime()
                )).map(location => (
                    <div 
                        key={location.id}
                        style={styles.outerDivStyle}
                    >
                        <div style={styles.titleBarStyle}>
                            <h2 style={styles.nameStyle}>{location.name}</h2>
                            <div style={styles.buttonDivStyle}>
                                <LinkButton
                                    className="btn btn-primary btn-sm text-nowrap mx-1 rounded"
                                    to={{
                                        pathname: `/EditEventForm/${location.id}`,
                                        id: location.id,
                                    }}
                                >
                                    Edit Listing
                                </LinkButton>
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-sm text-nowrap mx-1 rounded"
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
                        <p>{this.splitTags(location.tags)}</p>
                        <hr style={styles.hrStyle}/>
                        <p style={styles.contactStyle}>Contact Info:</p>
                        Phone Number: <a href={"tel:" + location.phone_number}>{location.phone_number}</a>
                        <br />
                        Email: <a href={"mailto:" + location.email}>{location.email}</a>
                    </div>
                )) }

                <hr />
                <h1 style={styles.headerStyle}>{ user ? `${user.username}'s Past Events:` : `` }</h1>
                { msg2 }

                { this.props.uLocations.filter(location => (
                    location.user === user.id
                )).filter(location => (
                    new Date(location.date).getTime() < new Date(this.dateToday()).getTime()
                )).map(location => (
                    <div 
                        key={location.id}
                        style={styles.outerDivStyle}
                    >
                        <div style={styles.titleBarStyle}>
                            <h2 style={styles.nameStyle}>{location.name}</h2>
                            <div style={styles.buttonDivStyle}>
                                <LinkButton
                                    className="btn btn-primary btn-sm text-nowrap mx-1 rounded"
                                    to={{
                                        pathname: `/EditEventForm/${location.id}`,
                                        id: location.id,
                                    }}
                                >
                                    Edit Listing
                                </LinkButton>
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-sm text-nowrap mx-1 rounded"
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
        margin: "30px 0 20px 9.5vw",
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
        opacity: "0.3",
        margin: "0 auto 150px"
    },
    pDivStyle: {
        margin: "0 0 60px 9.5vw",
        width: "80%",
    },
    pStyle: {
        margin: "0 auto 7px"
    },
    headerDivStyle: {
        display: "flex", 
        justifyContent: "space-between", 
        width: "93%"
    },
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    uLocations: state.uLocations.uLocations,
});

export default connect(mapStateToProps, { getULocations, deleteULocation, })(ViewYourEvents);
