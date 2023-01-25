import userRoutes from './user/routes';
import profileRoutes from './profile/routes';
import playlistRoutes from './playlist/routes';
import { Snapshot, Success } from '../types/core';

export { userRoutes, profileRoutes, playlistRoutes };

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
