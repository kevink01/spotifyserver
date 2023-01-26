import { FullPlaylist, Playlist } from '../core';

export interface PlaylistsResponse {
	playlists: Playlist[] | FullPlaylist[];
}
