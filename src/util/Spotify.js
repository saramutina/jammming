let accessToken;
/*
! Insert your Spotify Client Id here!
You can get it at:
https://developer.spotify.com/dashboard/login
*/
const CLIENT_ID = '';
const REDIRECT_URI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`
        try {
            const response = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        }
        catch (error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
        try {
            const getUsernameResponse = await fetch('https://api.spotify.com/v1/me', { headers: headers });
            const jsonGetUsernameResponse = await getUsernameResponse.json();
            userId = jsonGetUsernameResponse.id;

            const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: playlistName })
            });
            const jsonCreatePlaylistResponse = await createPlaylistResponse.json();
            const playlistId = jsonCreatePlaylistResponse.id;

            const addTrackResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uris: trackURIs })
            });
        }
        catch (error) {
            console.log(error);
        }
    }

}

export default Spotify;