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
    locationsLL: PropTypes.array.isRequired
    //schedules: PropTypes.array.isRequired,
  };
  componentDidMount(props) {
    var pathname = this.props.location.pathname;
    var res = pathname.split("/");
    this.setState({ ID: res[2]});
    this.props.getLocationsLL();
    
    console.log("Hello",this.props.locationsLL);
    this.props.getSchedules();
    console.log("Hello",this.props.schedules);
    //this.makeScheduleApiCall();
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
            <div>
              <h4>
                by &nbsp; <a href="#">Goodman Jewish Family Services</a>
              </h4>
            </div>
            <div className={styles.programDescription}>
              <p>{location.description}</p>
            </div>
            <div className={styles.subHeads}>
              <h5>
                <i className={styles.helo}></i>
                <span data-translate="Services this program provides:">
                  Services this program provides:
                </span>
              </h5>
              <ul className={styles.listInline}>
                <li>free food drive</li>
                <li>free grocery</li>
              </ul>
              <div>
                <span>Coverage Area: </span>
                This food drive is for Broward Community
              </div>
            </div>

            <div>
              <div className={styles.subHeads}>Jewish Family Home Care Inc</div>
              <div>{location.address}</div>
              <div>
                Phone : <a href="#">{location.phone_number}</a>
                <br />
                Email : <a href="#">{location.email}</a>
              </div>
            </div>
            <div>
            {this.props.schedules && this.props.schedules.filter(
              schedule => schedule.location == (this.state.ID)).map(schedule => (
            <div className={styles.subHeads} key={index} >
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
