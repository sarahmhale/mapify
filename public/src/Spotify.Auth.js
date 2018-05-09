/* global SpotifyPlayer */

/**
 * (C) 2017 Spotify AB
 */

/**
 * Take them to accounts.spotify.com
 * Why? So we can get an access token to play music!
 *
 * Code sample:
 *   document.getElementById('button').onclick = (e) => {
 *     e.preventDefault();
 *     SpotifyPlayer.sendToLogin();
 *   }
 */

SpotifyPlayer.sendToLogin = () => {
  // Your Spotify Developer Application
  // Get at https://beta.developer.spotify.com/dashboard/
  let client_id    = "3f693f552bd04f8596dd748f5fbe535c";
  let redirect_uri = "http://localhost:3000";

  // You don't need to update these.
  let scopes = "streaming user-read-birthdate " +
               "user-read-email user-read-private " +
               "user-modify-playback-state";

  window.location = [
    "https://accounts.spotify.com/authorize",
    `?client_id=${client_id}`,
    `&redirect_uri=${redirect_uri}`,
    `&scope=${scopes.replace(" ", "%20")}`,
    "&response_type=token",
    "&show_dialog=true"
  ].join('');
};

/**
 * When they return, let's get the hash.
 * Why? Well, if we don't, we can't get the access token Spotify gave us!
 *
 * Example code:
 *   if (SpotifyPlayer.isAccessToken()) {
 *     console.log("My Access Token", SpotifyPlayer.getAccessToken());
 *   }
 */

SpotifyPlayer.isAccessToken = () => {
  return SpotifyPlayer.getAccessToken() != null;
};

SpotifyPlayer.getAccessToken = () => {
  let hashExists = window.location.hash.length > 0;
  let hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  if (SpotifyPlayer.access_token) {
    // Return the key we've saved
    return SpotifyPlayer.access_token;
  }

  else if (hashExists) {
    // Empty the hash
    window.location.hash = '';

    // Set the access token
    SpotifyPlayer.access_token = hash.access_token;

    // Let us know when the access token expires
    setTimeout(() => {
      if (window.onSpotifyUserSessionExpires) {
        window.onSpotifyUserSessionExpires();
      }
    }, hash.expires_in * 1000);

    // Return the access token
    return SpotifyPlayer.access_token;
  }
  else {
    return null;
  }
};
