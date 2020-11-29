import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Search from "./Search";

export class Home extends Component {
    static propTypes = {
		auth: PropTypes.object.isRequired,
	}

    render() {
        const { isAuthenticated } = this.props.auth;
        const authMsg = (
            <p style={styles.pStyle}>Click on the "Your Events" button on the header to create, view, edit and delete events you've created.</p>
        );
        const guestMsg = (
            <p style={styles.pStyle}>Log in or register as a new user to create your own postings for charity events!</p>
        );

        return (
            <div>
                <h1 style={styles.h1Style}>South Florida Free Food</h1>
                <h3 style={styles.h3Style}>Search by location or by keywords for food pantries, food banks, and other charity organizations/events giving way free food and other essential supplies.</h3>
                <h3 style={styles.h3Style}>Please make sure to read location/event descriptions carefully to make sure you meet the criteria for receiving aid from the organizers running these locations/events.</h3>
                {isAuthenticated ? authMsg : guestMsg}
                <br />
                <Search />
            </div>
        )
    }
}

const styles = {
    h1Style: {
        fontSize: "4.5rem",
        width: "90%",
        margin: "20px auto 40px"
    },
    h3Style: {
        fontSize: "1.5rem",
        width: "90%",
        margin: "0 auto 15px",
    },
    pStyle: {
        width: "90%",
        margin: "0 auto",
    },
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(Home);
