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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }



  handleSubmit(song) {
    console.log(song)
    window.SpotifyPlayer.searchTracks(song).then(res => {
    if(!res.tracks.items[0]) return;
      window.SpotifyPlayer.playTrack("spotify:track:" + res.tracks.items[0].id)
    });


  }

  pauseSong() {
    window.SpotifyPlayer.WebPlaybackSDK.pause()
  }

  handleClick(event) {
    let lat = event.latLng.lat()
    let lng = event.latLng.lng()

    this.setState({
      markers: [...this.state.markers, { lat: lat, lng: lng, song: '', index: this.state.index }]
    })
    this.setState({ index: this.state.index + 1 })
  }

  handleChange(event) {
    this.setState({ searchedSong: event.target.value });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Mapify</h1>
        </header>
        <MapWithAMarker
          playSong={this.playSong}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleSubmit={this.handleSubmit}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=gometry,drawing,places"
          markers={this.state.markers}
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
