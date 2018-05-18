import React, { Component } from 'react';

import './App.css';
import { MapWithAMarker } from './Map'
class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="logo" src={require('./mapify_logo_notext.png')} />
          <h1 className="App-title">Welcome to Mapify</h1>
        </header>
        <MapWithAMarker
          deleteMarker={this.deleteMarker}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=gometry,drawing,places"
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
