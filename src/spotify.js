export const authEndpoint = "https://accounts.spotify.com/authorize";

export const redirectUri = "http://localhost:3001";

export const clientId = "8d4065b01f934611b77066ee2809707c";

export const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-email",
];

export const loginUri = `${authEndpoint}
?client_id=${clientId}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`;
