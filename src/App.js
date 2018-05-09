import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedSong: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    this.playSong()
    event.preventDefault();
  }


  handleChange(event) {
    this.setState({ searchedSong: event.target.value });
  }
  playSong() {
    console.log("state"+this.state)
    window.SpotifyPlayer.searchTracks(this.state.searchedSong).then(res =>
      window.SpotifyPlayer.playTrack("spotify:track:" + res.tracks.items[0].id));
    //  window.SpotifyPlayer.playTrack("spotify:track:3Q16RW1GJBjmdsNBd6AsH9");
  }

  pauseSong() {
    window.SpotifyPlayer.WebPlaybackSDK.pause()
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">

          <form onSubmit={this.handleSubmit}>
            <label>
              Song:
              <input
                type="text"
                value={this.state.searchedSong}
                name="name"
                onChange={this.handleChange}/>
            </label>
            <input

              type="submit"
              value="Submit"
            />
          </form>
          <button onClick={this.pauseSong}>Pause</button>
        </div>
      </div>
    );
  }
}

if (window.SpotifyPlayer.isAccessToken() === false) {
  window.SpotifyPlayer.sendToLogin();
}

export default App;
