window.SpotifyPlayer = {
  /**
   * The user's access token from Spotify. Lasts 60 minutes.
   *
   * Code Sample:
   *   console.log(SpotifyPlayer.access_token);
   */
  access_token: null,

  /**
   * Our local instance of Web Playback SDK.
   *
   * Code Sample:
   *   console.log(SpotifyPlayer.WebPlaybackSDK);
   */
  WebPlaybackSDK: null,

  /**
   * Some custom callbacks we've created.
   */
  renderWebPlaybackSDKError:   null, // Throw an error (our app equiv. of console.error)
  onSpotifyPlayerConnected:    null, // User session starts
  onSpotifyUserSessionExpires: null, // User session expires

  /**
   * Transfer Playback.
   *
   * See https://beta.developer.spotify.com/documentation/web-api/
   *
   * Example code:
   *   SpotifyPlayer.transferPlayback()
   */
  transferPlayback: () => {
    let request = new Request("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: new Headers({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + SpotifyPlayer.getAccessToken()
      }),
      body: JSON.stringify({
        play: true,
        device_ids: [SpotifyPlayer.WebPlaybackSDK._options.id]
      })
    });

    return window.fetch(request);
  },

//   /**
//    * Play a track.
//    *
//    * See https://beta.developer.spotify.com/documentation/web-api/
//    *
//    * Example code:
//    *   SpotifyPlayer.playTrack("spotify:track:1j4kHkkpqZRBwE0A4CN4Yv")
//    */
    playTrack: (uri) => {
      let request = new Request("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: new Headers({
          'Content-Type':  'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + SpotifyPlayer.getAccessToken()
        }),
       body: JSON.stringify({ uris: [uri] })
      });

      return window.fetch(request).then((resp) => resp.json()).catch((error)=>{
        console.log(error)
      });
    },

//   /**
//    * Search
//    *
//    * See https://beta.developer.spotify.com/documentation/web-api/
//    *
//    * Example code:
//    *   SpotifyPlayer.searchTracks("Kanye West").then((searchResults) => { console.log(searchResults); });
//    */
    searchTracks: (query) => {
      let request = new Request("https://api.spotify.com/v1/search?type=track&q="+query+"*&market=from_token", {
        method: "GET",
        headers: new Headers({
          'Content-Type':  'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + SpotifyPlayer.getAccessToken()
        })
      });
      return window.fetch(request).then((resp) => resp.json());
    },
    getPlaylist: (user_id, playlist_id) => {
      let request = new Request(
          "https://api.spotify.com/v1/users/" + user_id + "/playlists/" + playlist_id, {
        method: "GET",
        headers: new Headers({
          'Content-Type':  'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + SpotifyPlayer.getAccessToken()
        })
      });

      return window.fetch(request).then((resp) => resp.json());
    },
    getTrackInfo: (id) => {
      let request = new Request(
          "https://api.spotify.com/v1/audio-features/" + id
          , {
        method: "GET",
        headers: new Headers({
          'Content-Type':  'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + SpotifyPlayer.getAccessToken()
        })
      });

      return window.fetch(request).then((resp) => resp.json());
    }

};
