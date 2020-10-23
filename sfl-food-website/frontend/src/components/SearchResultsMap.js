import React, { Component , useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocations } from '../actions/locations'
import MapGL from '@urbica/react-map-gl'

function SRMap() {
    const [viewport, setViewport] = useState({
        latitude: 25.761681,
        longitude: -80.191788,
        zoom: 10
    });

    return (
        <MapGL 
            {...viewport}
            accessToken={"pk.eyJ1IjoiYmNvbnMwMDkiLCJhIjoiY2tnbGJnbjhuMHBzbTJ6cXAwdjgwNTNsYyJ9.y5i5-ayp_o_o_9YrC5QQMg"}
            mapStyle="mapbox://styles/bcons009/ckglkhmek02vv1awygco6zo83"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            style={{ width: '75vw', height: '100vh' }}
        >
            markers here
        </MapGL>
    )
}

export default class SearchResultsMap extends Component {
    render() {
        return (
            <div>
                <SRMap />
            </div>
        )
    }
}
