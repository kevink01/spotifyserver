import albumRoutes from './album/routes';
import artistRoutes from './artist/routes';
import playbackRoutes from './playback/routes';
import playlistRoutes from './playlist/routes';
import profileRoutes from './profile/routes';
import userRoutes from './user/routes';
import { Core, FullTrack } from '../types/core';
import { Image, Login, Playing, Snapshot, Success } from '../types/util';

export { albumRoutes, artistRoutes, profileRoutes, playbackRoutes, playlistRoutes, userRoutes };

export function images(data: SpotifyApi.ImageObject[]): Image[] {
	return data.map((image: SpotifyApi.ImageObject): Image => {
		return {
			height: image.height ?? 0,
			width: image.width ?? 0,
			url: image.url
		};
	});
}

export function login(data: any): Login {
	return {
		access: data.body.access_token,
		expires: data.body.expires_in,
		refresh: data.body.refresh_token
	};
}

export function playing(value: boolean): Playing {
	return {
		playing: value
	};
}

export function snapshot(data: SpotifyApi.AddTracksToPlaylistResponse): Snapshot {
	return {
		snapshot: data.snapshot_id
	};
}

export function success(value: boolean): Success {
	return {
		success: value
	};
}

export function track(data: SpotifyApi.SingleTrackResponse): FullTrack {
	return {
		album: {
			date: new Date(data.album.release_date),
			id: data.album.id,
			images: images(data.album.images),
			name: data.album.name,
			type: data.album.type,
			uri: data.album.uri
		},
		artists: data.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
			return {
				id: artist.id,
				name: artist.name,
				type: artist.type,
				uri: artist.uri
			};
		}),
		date: new Date(data.album.release_date),
		duration: data.duration_ms,
		explicit: data.explicit,
		id: data.id,
		local: data.is_local ?? false,
		name: data.name,
		number: data.track_number,
		popularity: data.popularity,
		type: data.type,
		uri: data.uri
	};
}
