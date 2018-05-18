import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,

} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox"
import InputBox from './InputBox'
import {Markers} from './Markers'
const _ = require("lodash");


class Map extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }


  componentWillMount() {
    const refs = {}

    this.setState({
      bounds: null,
      center: {
        lat: 41.9, lng: -87.624
      },
      markers: [],
      onMapMounted: ref => {
        refs.map = ref;
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });
        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
          center: nextCenter,
          markers: nextMarkers,
        });
      },
    })
  }

  render() {
    return (
      <GoogleMap
        ref={this.state.onMapMounted}
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={this.state.center}
        onClick={(e) => this.props.handleClick(e)}
        onBoundsChanged={this.state.onBoundsChanged}
      >
        <SearchBox
          ref={this.state.onSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.state.onPlacesChanged}
        >
          <InputBox/>
        </SearchBox>
        {this.props.markers.map(marker => {

          return (
            <Markers
              handleSubmit={this.props.handleSubmit}
              handleChange={this.props.handleChange}
              marker={marker}
            />
          )
        })}
      </GoogleMap>
    )
  }
}



export const MapWithAMarker = withScriptjs(withGoogleMap(Map))
