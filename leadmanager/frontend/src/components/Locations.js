import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocations, deleteLocation } from '../actions/locations'
import { getSchedules } from '../actions/schedules'

export class Locations extends Component {

    static propTypes = {
        locations: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getLocations();
        this.props.getSchedules();
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
                            {/*
                                <th>Description</th>
                                <th>Cost</th>
                            */}
                            <th>Website</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.locations.map(location => (
                            <tr key={location.id}>
                                <td>{location.name}</td>
                                <td>{location.address}</td>
                                <td>{location.website}</td>
                                <td>{location.email}</td>
                                <td>{location.phone_number}</td>
                                {/*
                                <td>
                                    <button onClick={this.props.deleteLocation.bind(this, location.id)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                                */}
                                {this.props.schedules && this.props.schedules.filter(
                                    schedule => schedule.location == location.id).map(schedule => (
                                    <td key={"schedule" + schedule.location}>
                                        <ul>
                                            <li>{schedule.sunday}</li>
                                            <li>{schedule.monday}</li>
                                            <li>{schedule.tuesday}</li>
                                            <li>{schedule.wednesday}</li>
                                            <li>{schedule.thursday}</li>
                                            <li>{schedule.friday}</li>
                                            <li>{schedule.saturday}</li>
                                        </ul>
                                    </td>
                                ))}
                            </tr>
                        )) }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    locations: state.locations.locations,
    // 1st locations = reducer
    schedules: state.schedules.locations
});

export default connect(mapStateToProps, { getLocations, deleteLocation, getSchedules })(Locations);
