import React, { Component } from 'react';

import {
  Marker,
  InfoWindow
} from "react-google-maps";
import './App.css';
import { Mutation } from "react-apollo";
import { DELETE_MARKER, GET_MARKERS } from './api/queries'

export class Markers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
    this.playSong(this.props.marker.song)
  }


  playSong(song) {
    window.SpotifyPlayer.searchTracks(song).then(res => {
      if (!res.tracks || !res.tracks.items[0]) {
          window.SpotifyPlayer.playTrack("spotify:track:12VqixLsWDuevEbu2CWyjT")
      }else{
      window.SpotifyPlayer.playTrack("spotify:track:" + res.tracks.items[0].id)
    }
    });

  }

  pauseSong() {
    window.SpotifyPlayer.WebPlaybackSDK.pause()
  }


  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
    this.pauseSong()
  }


  render() {
    return (
      <Mutation mutation={DELETE_MARKER}

        update={(cache, { data: { deleteMarker } }) => {
          const data = cache.readQuery({ query: GET_MARKERS });
          data.markers = data.markers.filter(marker => marker.id != deleteMarker.id)

          cache.writeQuery({query: GET_MARKERS, data  })
        }}>
        {(deleteMarker, { data,error }) => {

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
                      <button onClick={()=>{
                        this.pauseSong()
                        deleteMarker({variables:{id:this.props.marker.id}})}}
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
