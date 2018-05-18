import React, { Component } from 'react';

import './App.css';
import { MapWithAMarker } from './Map'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      searchedSong: '',
      index: 1
    }

    this.playSong = this.playSong.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this)
  }



  playSong(song) {
    window.SpotifyPlayer.searchTracks(song).then(res => {
      if (!res.tracks.items[0]) return;
      window.SpotifyPlayer.playTrack("spotify:track:" + res.tracks.items[0].id)
    });

  }

  pauseSong() {
    window.SpotifyPlayer.WebPlaybackSDK.pause()
  }

  deleteMarker(index) {
    console.log("delete marker")
    //TODO:mutaiton delete
    // let value = this.state.markers.findIndex(marker => marker.index == index)
    // this.setState((prevState) => ({
    //   markers: [...prevState.markers.slice(0, value), ...prevState.markers.slice(value + 1)]
    // }))
    // this.pauseSong()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="logo" src={require('./mapify_logo_notext.png')} />
          <h1 className="App-title">Welcome to Mapify</h1>
        </header>
        <MapWithAMarker
          deleteMarker={this.deleteMarker}

          // handleChange={this.handleChange}
          // handleClick={this.handleClick}
          playSong={this.playSong}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=gometry,drawing,places"
          // markers={this.state.markers}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `80vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

      </div>
    );
  }
}

if (window.SpotifyPlayer.isAccessToken() === false) {
  window.SpotifyPlayer.sendToLogin();
}

export default App
