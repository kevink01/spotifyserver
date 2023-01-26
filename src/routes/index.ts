import albumRoutes from './album/routes';
import artistRoutes from './artist/routes';
import profileRoutes from './profile/routes';
import playlistRoutes from './playlist/routes';
import userRoutes from './user/routes';
import { Image, Snapshot, Success } from '../types/core';

export { albumRoutes, artistRoutes, profileRoutes, playlistRoutes, userRoutes };

export function success(value: boolean): Success {
	return {
		success: value
	};
}

export function snapshot(data: SpotifyApi.AddTracksToPlaylistResponse): Snapshot {
	return {
		snapshot: data.snapshot_id
	};
}

export function images(data: SpotifyApi.ImageObject[]): Image[] {
	return data.map((image: SpotifyApi.ImageObject): Image => {
		return {
			height: image.height ?? 0,
			width: image.width ?? 0,
			url: image.url
		};
	});
}
