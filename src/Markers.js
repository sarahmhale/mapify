import React, { Component } from 'react';

import {
  Marker,
  InfoWindow

} from "react-google-maps";
import './App.css';

export class Markers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
    this.setSong = this.setSong.bind(this);

  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
    this.props.playSong(this.props.marker.song)
  }



  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  }
  setSong(songName) {
    this.props.marker.song = songName
  }

  render() {
    return (

      <Marker
        key={this.props.marker.index}
        position={{ lat: this.props.marker.lat, lng: this.props.marker.lng}}
        onClick={() => this.handleToggleOpen()}
      >

        {
            this.state.isOpen &&
              <InfoWindow onCloseClick={this.handleToggleClose}>
                <div>
                  <h1>{this.props.marker.song}</h1>
                  <button onClick={()=>this.props.deleteMarker(this.props.marker.index)}
                    type="danger">Delete</button>
                </div>
              </InfoWindow>
        }

        </Marker>


    );
  }
}
