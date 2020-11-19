import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocationsLL } from '../actions/locationsLL'
import { getULocations } from '../actions/user-locations'
import MapGL, { Marker, Popup } from '@urbica/react-map-gl'

export class SearchResultsMap extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            locationSelected: false,
            viewport: {
                latitude: 26.122438,
                longitude: -80.137314,
                zoom: 8.8,
            }
        };
    }

    selectedLocation = {
        name: "",
        address: "",
        description: "",
        website: "",
        email: "",
        phone_number: ""
    };

    static propTypes = {
        locationsLL: PropTypes.array.isRequired,
        uLocations: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.props.getLocationsLL();
        this.props.getULocations();
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

    render() {
        const setViewport = viewport => this.setState(viewport);

        const { selectedLocation } = this;
        const setSelectedLocation = selectedLocation => this.setState({
            locationSelected: true,
            selectedLocation
        });
        const hideSelectedLocation = selectedLocation => this.setState({
            locationSelected: false,
            selectedLocation
        });

        return(
            <MapGL
                {...this.state.viewport}
                accessToken={"pk.eyJ1IjoiYmNvbnMwMDkiLCJhIjoiY2tnbGJnbjhuMHBzbTJ6cXAwdjgwNTNsYyJ9.y5i5-ayp_o_o_9YrC5QQMg"}
                mapStyle="mapbox://styles/bcons009/ckglkhmek02vv1awygco6zo83"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
                style={{ width: '100%', height: '100%' }}
            >
                { this.props.uLocations.filter(location => (
                    new Date(location.date).getTime() >= new Date(this.dateToday()).getTime()
                )).map(location => (
                    <Marker
                        key={location.id}
                        latitude={location.latitude}
                        longitude={location.longitude}
                    >
                        <button 
                            style={styles.buttonStyle}
                            onClick={e => {
                                e.preventDefault();
                                setSelectedLocation(location);
                            }}
                        >
                            <img 
                                src="http://maps.google.com/mapfiles/ms/micons/red.png"
                                alt="Location Icon" 
                            />
                        </button>
                    </Marker>
                )) }
                { this.props.locationsLL.map(location => (
                    <Marker
                        key={location.id}
                        latitude={location.latitude}
                        longitude={location.longitude}
                    >
                        <button 
                            style={styles.buttonStyle}
                            onClick={e => {
                                e.preventDefault();
                                setSelectedLocation(location);
                            }}
                        >
                            <img 
                                src="http://maps.google.com/mapfiles/ms/micons/blue.png"
                                alt="Location Icon" 
                            />
                        </button>
                    </Marker>
                )) }
                {this.state.locationSelected ? (
                    <Popup 
                        latitude={this.state.selectedLocation.latitude} 
                        longitude={this.state.selectedLocation.longitude}
                        onClose={() => {
                            hideSelectedLocation(null);
                        }}
                    >
                        <h3>{this.state.selectedLocation.name}</h3>
                        <p>{this.state.selectedLocation.address}</p>
                    </Popup>
                ) : <div>NULL</div>}
            </MapGL>
        );
    }
}

const styles = {
    buttonStyle: {
        height: "47px",
        width: "30px",
        padding: "0",
        border: "none",
        background: "none"
    },
    markerStyle: {
        width: "500%",
        height: "500%",
        marginTop: "-50px",
        marginLeft: "-7px"
    }
}

const mapStateToProps = state => ({
    locationsLL: state.locationsLL.locationsLL,
    uLocations: state.uLocations.uLocations,
});

export default connect(mapStateToProps, { getLocationsLL, getULocations })(SearchResultsMap);