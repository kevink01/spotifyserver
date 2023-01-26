import { images } from '..';
import { Core, Device, Playback } from '../../types/core';
import { DevicesResponse } from '../../types/core/httpResponses';

interface Positon {
	position: number;
}

interface Shuffle {
	shuffle: boolean;
}

interface Repeat {
	repeat: string;
}

export function devices(data: SpotifyApi.UserDevicesResponse): DevicesResponse {
	return {
		devices: data.devices.map((device: SpotifyApi.UserDevice): Device => {
			return {
				active: device.is_active,
				id: device.id ?? '',
				name: device.name,
				restricted: device.is_restricted,
				type: device.type,
				volume: device.volume_percent ?? 0
			};
		})
	};
}

export function playback(state: SpotifyApi.CurrentPlaybackResponse, track: SpotifyApi.SingleTrackResponse): Playback {
	return {
		device: {
			active: state.device.is_active,
			id: state.device.id ?? '',
			name: state.device.name,
			restricted: state.device.is_restricted,
			type: state.device.type,
			volume: state.device.volume_percent ?? 0
		},
		playing: state.is_playing,
		progress: state.progress_ms ?? 0,
		repeat: state.repeat_state,
		shuffle: state.shuffle_state,
		track: {
			album: {
				date: new Date(track.album.release_date),
				id: track.album.id,
				images: images(track.album.images),
				name: track.album.name,
				type: track.album.type,
				uri: track.album.uri
			},
			artists: track.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
				return {
					id: artist.id,
					name: artist.name,
					type: artist.type,
					uri: artist.uri
				};
			}),
			date: new Date(track.album.release_date),
			duration: track.duration_ms,
			explicit: track.explicit,
			id: track.id,
			local: track.is_local ?? false,
			name: track.name,
			number: track.track_number,
			popularity: track.popularity,
			type: track.type,
			uri: track.uri
		}
	};
}

export function position(value: number): Positon {
	return {
		position: value
	};
}

export function shuffle(value: boolean): Shuffle {
	return {
		shuffle: value
	};
}

export function repeat(value: string): Repeat {
	return {
		repeat: value
	};
}
