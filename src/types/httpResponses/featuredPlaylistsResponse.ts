import { FullPlaylist } from '../core';

export interface FeaturedPlaylistsResponse {
	message: string;
	playlists: FullPlaylist[];
	total: number;
}
