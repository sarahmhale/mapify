import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,

} from "react-google-maps";

import {Markers} from './Markers'


export const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    onClick={(e) => props.handleClick(e)}
  >
    {props.markers.map(marker => {

      return (
        <Markers
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          marker={marker}
        />
      )
    })}
  </GoogleMap>
));
