import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,

} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox"
import InputBox from './InputBox'
import { AddInfo } from './AddInfo'
import { Markers } from './Markers'
import { Query } from "react-apollo";
import { GET_MARKERS } from './api/queries'
const _ = require("lodash");


class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: '',
      lng: '',
      creatingMarker: ''

    }
  }


  componentWillMount() {
    const refs = {}

    this.setState({
      bounds: null,
      center: {
        lat: 41.9,
        lng: -87.624
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
  renderMarker(data) {
    if (!data || !data.markers) {
      return;
    } else {
      return data.markers.map(marker => {
        return (
          <Markers
            deleteMarker={this.props.deleteMarker }
            playSong={this.props.playSong}
            // handleChange={this.props.handleChange}
            marker={marker}
          />
        )
      })
    }
  }

  createMarker(event) {
    this.setState({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      createMarker: true
    })
  }
  render() {
    return (
      <Query
        query={GET_MARKERS}
      >
        {({ loading, error, data }) => {

          return(
            <GoogleMap
              ref={this.state.onMapMounted}
              defaultZoom={8}
              defaultCenter={{ lat: -34.397, lng: 150.644 }}
              center={this.state.center}
              onClick={(e) => this.createMarker(e)}
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
              {this.state.createMarker ?
                <AddInfo
                  lat={this.state.lat}
                  lng={this.state.lng}
                />: null}
              {this.renderMarker(data)}
            </GoogleMap>)
        }}
      </Query>
    )
  }
}



export const MapWithAMarker = withScriptjs(withGoogleMap(Map))
