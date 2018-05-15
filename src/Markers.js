import React, { Component } from 'react';

import {
  Marker,
  InfoWindow

} from "react-google-maps";
import './App.css';

import { AddInfo } from './AddInfo'

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
    this.props.handleSubmit(this.props.marker.song)
  }

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  }
  setSong(songName){
    this.props.marker.song = songName
  }

  render() {
    return (

      <Marker
        key={this.props.marker.index}
        position={{ lat: this.props.marker.lat, lng: this.props.marker.lng}}
        onClick={() => this.handleToggleOpen()}
      >


        {this.props.marker.song.length === 0?
          <AddInfo
            handleToggleOpen={this.handleToggleOpen}
            setSong={this.setSong}
            handleSubmit={this.props.handleSubmit}
            handleChange={this.props.handleChange}
          />: null}
        {
            this.state.isOpen &&
              <InfoWindow onCloseClick={this.handleToggleClose}>
                <h1>{this.props.marker.song}</h1>
              </InfoWindow>
        }

        </Marker>


    );
  }
}
