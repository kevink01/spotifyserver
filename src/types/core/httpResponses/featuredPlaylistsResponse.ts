import { Playlist } from '..';

export interface FeaturedPlaylistsResponse {
	message: string;
	playlists: Playlist[];
	total: number;
}
