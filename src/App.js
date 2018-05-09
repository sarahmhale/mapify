import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

if (window.SpotifyPlayer.isAccessToken() === false) {
  window.SpotifyPlayer.sendToLogin();
} else {
  // for (var index = 0; index < window.playlistsToLoad.length; index++) {
  //   var playlist = window.playlistsToLoad[index];
  //   window.SpotifyPlayer.getPlaylist(playlist.user, playlist.playlist).then((loadedPlaylist) => {
  //     // Add songs to list
  //     for (var i = 0; i < loadedPlaylist.tracks.items.length; i++) {
  //       window.tracks.push(loadedPlaylist.tracks.items[i]);
  //     }
  //   });
  // }
}

export default App;
