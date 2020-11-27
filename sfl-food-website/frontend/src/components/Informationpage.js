import React, { Component} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocationsLLID } from '../actions/locationsLL'
//import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";



export  class Informationpage extends Component {
  state = {
    meals : [],
    schedules : []
  };

  
 static propTypes = {
    locations: PropTypes.array.isRequired
}
componentDidMount(props) {
  console.log("this.props.location","Hello");
  var pathname = this.props.location.pathname;
  var res = pathname.split("/");
  var ID = res[2];
  console.log("ID",ID);
  this.props.getLocationsLLID(ID);
 console.log("this.props.locations",this.props.locations);
  //this.makeLocationApiCall();
 // this.makeScheduleApiCall();
}



  render() {
    return (
     
      <div className={styles.mainDiv}>
     
       
     <div>
        <div>
          <h2 className={styles.eventHeading}>{this.props.locations.name}</h2>
        </div>
        <div>
          <h4>
            by &nbsp; <a href="#">Goodman Jewish Family Services</a>
          </h4>
        </div>
        <div className={styles.programDescription}>
          <p>
          {this.props.locations.description}
          </p>
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
          <div>
          {this.props.locations.address}
          </div>
          <div>
            Phone : <a href="#">{this.props.locations.phone_number}</a>
            <br />
            Email : <a href="#">{this.props.locations.email}</a>
          </div>
        </div>
        <div className={styles.subHeads}>
          S:
          <span></span>
          <br />
          M:
          <span ></span>
          <br />
          T:
          <span></span>
          <br />
          W:
          <span></span>
          <br />
          T:
          <span></span>
          <br />
          F:
          <span></span>
          <br />
          S:
          <span></span>
          <br />
        </div>
        </div>
        
        
      </div>
      
      
      );
  }
}
const mapStateToProps = state => ({
  //locations: state.locations.locations
});

export default connect(mapStateToProps, { getLocationsLLID })(Informationpage);
//ReactDOM.render(<Informationpage />, document.getElementById("app"));