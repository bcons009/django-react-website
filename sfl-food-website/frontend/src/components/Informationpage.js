import React, { Component } from "react";
//import ReactDOM from "react-dom";
import styles from "../mystyle.module.css";



export default class Informationpage extends Component {
  state = {};

  render() {
    return (
        
      <div className={styles.mainDiv}>
        <div>
          <h2 className={styles.eventHeading}>The Cupboard</h2>
        </div>
        <div>
          <h4>
            by &nbsp; <a href="#">Goodman Jewish Family Services</a>
          </h4>
        </div>
        <div className={styles.programDescription}>
          <p>
            Goodman Jewish Family Services The Cupboard is a kosher food pantry
            that will serve those in the Jewish Community throughout Broward
            County who have been identified as food insecure, live at or below
            150 percent of the poverty line, and do not have the resources to
            provide nutritional meals for themselves or their families.
            <br />
            At The Cupboard, our whole-person approach starts with:
            <br />
            -Food provision through the distribution of nutritious, kosher food
            clients can pick from in our choice market layout
            <br />
            -Recipients will be able to select from kosher, non-perishable
            staples and canned goods and fresh produce, and chicken, meat, and
            frozen items, as available.
            <br />
            - Provide information regarding government benefits
            <br />
            To have access to this program, the potential recipient will meet
            with a JFS professional who will perform a comprehensive evaluation
            to assess the family’s overall needs.
            <br />
            The recipient will ‘shop’ during pre-arranged, scheduled
            appointments to ensure privacy and confidentiality. The Cupboard
            will supply critically important food items and other daily
            necessities, as well as evaluate clients’ overall needs and arrange
            for appropriate support services. Because dignity is of the utmost
            concern, private one-on-one appointments will be scheduled at
            convenient times.
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
            100 S Pine Island Rd
            <br />
            Plantation, FL 33324
          </div>
          <div>
            Phone : <a href="#">954-321-3256</a>
            <br />
            Email : <a href="#">info@broward.com</a>
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
    );
  }
}

//ReactDOM.render(<Informationpage />, document.getElementById("app"));