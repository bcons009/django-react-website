import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocations, deleteLocation } from '../actions/locations'

export class Locations extends Component {
    static propTypes = {
        locations: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getLocations();
    }

    render() {
        return (
            <Fragment>
                <h2>Locations test</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Website</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.locations.map(location => (
                            <tr key={location.id}>
                                <td>{location.name}</td>
                                <td>{location.address}</td>
                                <td>{location.description}</td>
                                <td>{location.cost}</td>
                                <td>{location.website}</td>
                                <td>{location.email}</td>
                                <td>{location.phone_number}</td>
                                <td>
                                    <button onClick={this.props.deleteLocation.bind(this, location.id)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    locations: state.locations.locations
    // 1st locations = reducer
});

export default connect(mapStateToProps, { getLocations, deleteLocation })(Locations);
