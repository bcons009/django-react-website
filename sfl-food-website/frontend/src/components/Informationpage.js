import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocationsLL } from "../actions/locationsLL";
import { getSchedules } from "../actions/schedules";
//import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";

export class Informationpage extends Component {
  state = {
    //schedules: [],
    ID : "",
  };

  static propTypes = {
    locationsLL: PropTypes.array.isRequired,
    // schedules: PropTypes.array.isRequired,
  };

  componentDidMount(props) {
    var pathname = this.props.location.pathname;
    var res = pathname.split("/");
    this.setState({ ID: res[2]});
    this.props.getLocationsLL();
    
    this.props.getSchedules();
  }

  render() {
    return (
      <Fragment>
      <div>
      {this.props.locationsLL ? (
        <div className={styles.mainDiv}>
        {this.props.locationsLL.filter(locationsLL =>locationsLL.id == (this.state.ID)).map((location, index) => (
          <div key={index}>
            <div>
              <h2 className={styles.eventHeading}>{location.name}</h2>
            </div>
            <div className={styles.programDescription}>
              <p>{location.description}</p>
            </div>
            <div>
              <h5>Contact Information:</h5>
              <div>{location.address}</div>
              <div>
                Phone: <a href={"tel:" + location.phone_number}>{location.phone_number}</a>
                <br />
                {location.email.includes("null") ? 
                  <span>Email: (no email)</span> : (
                    <span>Email: <a href={"mailto:" + location.email}>{location.email}</a></span>
                  )
                }
                <br />
              </div>
            </div>
            <div>
            {this.props.schedules && this.props.schedules.filter(
              schedule => schedule.location == (this.state.ID)).map(schedule => (
            <div className={styles.subHeads} key={index} >
              <h5>Schedule:</h5>
              <br/>
              S:
              <span>{schedule.sunday}</span>
              <br />
              M:
              <span>{schedule.monday}</span>
              <br />
              T:
              <span>{schedule.tuesday}</span>
              <br />
              W:
              <span>{schedule.wednesday}</span>
              <br />
              T:
              <span>{schedule.thursday}</span>
              <br />
              F:
              <span>{schedule.friday}</span>
              <br />
              S:
              <span>{schedule.saturday}</span>
              <br />
            </div>
            ))}
            </div>
            </div>
          ))}
          </div>
          ): (
            <p>Try searching for a event</p>
          )}
      </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  locationsLL: state.locationsLL.locationsLL,
  schedules: state.schedules.locations
});

export default connect(mapStateToProps, { getLocationsLL, getSchedules })(Informationpage);
//ReactDOM.render(<Informationpage />, document.getElementById("app"));