import React, { Component } from 'react';

import {
  Marker,
  InfoWindow

} from "react-google-maps";
import './App.css';
import { Mutation } from "react-apollo";
import { DELETE_MARKER } from './api/queries'

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
      <Mutation mutation={DELETE_MARKER}>
        {(deleteMarker, { data,error }) => {
          console.log(this.props.marker.id)
          return(
            <Marker
              key={this.props.marker.index}
              position={{ lat: this.props.marker.latitude, lng: this.props.marker.longitude}}
              onClick={() => this.handleToggleOpen()}
            >

              {
                this.state.isOpen &&
                  <InfoWindow onCloseClick={this.handleToggleClose}>
                    <div>
                      <h1>{this.props.marker.song}</h1>
                      <button onClick={()=>deleteMarker({variables:{id:this.props.marker.id}})}
                        type="danger">Delete</button>
                    </div>
                  </InfoWindow>
              }

            </Marker>)
        }}
      </Mutation>

    );
  }
}
