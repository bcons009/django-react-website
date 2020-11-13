import React, { Component} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocations } from '../actions/locations'
//import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";



export default class Informationpage extends Component {
  state = {
    meals : []
  };

  

 /* static propTypes = {
    locations: PropTypes.array.isRequired
}*/
componentDidMount() {
  this.makeApiCall();
}

makeApiCall = searchInput => {
  var searchUrl = `http://localhost:8000/api/locationsLL/1/`;
  let currentComponent = this;
  fetch(searchUrl).then(function(response) {
    response.json().then(function(parsedJson) {
    console.log("response",parsedJson);
    return parsedJson;
    })
    .then(jsonData  => {
      console.log("response2",JSON.stringify(jsonData));
      currentComponent.setState({ meals: jsonData  });
    })
  })
 
};

  render() {
    return (
     
      <div className={styles.mainDiv}>
     
       
     <div>
        <div>
          <h2 className={styles.eventHeading}>{this.state.meals.name}</h2>
        </div>
        <div>
          <h4>
            by &nbsp; <a href="#">Goodman Jewish Family Services</a>
          </h4>
        </div>
        <div className={styles.programDescription}>
          <p>
          {this.state.meals.description}
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
          {this.state.meals.address}
          </div>
          <div>
            Phone : <a href="#">{this.state.meals.phone_number}</a>
            <br />
            Email : <a href="#">{this.state.meals.email}</a>
          </div>
        </div>
        <div className={styles.subHeads}>
          S:
          <span>Closed</span>
          <br />
          M:
          <span >8:00am - 5:00pm EST</span>
          <br />
          T:
          <span>8:00am - 5:00pm EST</span>
          <br />
          W:
          <span>8:00am - 5:00pm EST</span>
          <br />
          T:
          <span>8:00am - 5:00pm EST</span>
          <br />
          F:
          <span>8:00am - 5:00pm EST</span>
          <br />
          S:
          <span>Closed</span>
          <br />
        </div>
        </div>
        
        
      </div>
      
      
      );
  }
}
/*const mapStateToProps = state => ({
  locations: state.locations.locations
});*/

//export default connect(mapStateToProps, { getLocations })(SearchResultsMap);
//ReactDOM.render(<Informationpage />, document.getElementById("app"));