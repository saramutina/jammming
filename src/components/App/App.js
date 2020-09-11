import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      searchResults: [
        {name: 'Song',
        artist: 'Singer',
        album: 'First',
        id: ''}
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {name: 'Name',
        artist: 'Artist',
        album: 'Second',
        id: '',
        uri: ''}
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      const newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({playlistTracks: newPlaylist});
    }
  }

  removeTrack(track) {
    const newPlaylist = this.state.playlistTracks.filter(track => track.id !== track.id);
    this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.setState.playlistTracks.map(track => track.uri);
  }

  search(term) {
    console.log(term);
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
          onSearch={this.search} />
         <div className="App-playlist">
           <SearchResults 
           searchResults={this.state.searchResults} 
           onAdd={this.addTrack} />
           <Playlist 
           playlistName={this.state.playlistName} 
           playlistTracks={this.state.playlistTracks} 
           onRemove={this.removeTrack} 
           onNameChange={this.updatePlaylistName} 
           onSave={this.savePlaylist} />
         </div>
        </div>
      </div>
    );
  }
};

export default App;

// addTrack(track) {
//   if (this.state.playlistTracks.id.find(savedTrack => savedTrack.id === track.id)) {
//     return;
//   } else {
//     const playlistTracks = [...this.state.playlistTracks, track]
//     this.setState({playlistTracks})
//   }