import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocationsLL } from '../actions/locationsLL'
import MapGL, { Marker, Popup } from '@urbica/react-map-gl'
import { Link } from "react-router-dom";

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
        // this.mapRef = React.createRef();
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
        locationsLL: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getLocationsLL();
        /*
        const map = this.mapRef.current.getMap(); 
        map.once('load', () => {
            map.resize();
        });
        */
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
                                src="https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg" 
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
                        <h3> <Link to={`/Informationpage/${this.state.selectedLocation.id}/`}>{this.state.selectedLocation.name}</Link></h3>
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
    locationsLL: state.locationsLL.locationsLL
});

export default connect(mapStateToProps, { getLocationsLL })(SearchResultsMap);