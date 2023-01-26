import SpotifyWebApi from 'spotify-web-api-node';
import { images } from '..';
import { AlbumFull, Copyright, Core, Follower, Track } from '../../types/core';
import { FollowersResponse } from '../../types/core/httpResponses';

export function album(data: SpotifyApi.SingleAlbumResponse): AlbumFull {
	return {
		artists: data.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
			return {
				id: artist.id,
				name: artist.name,
				type: artist.type,
				uri: artist.uri
			};
		}),
		copyrights: data.copyrights.map((copyright: SpotifyApi.CopyrightObject): Copyright => {
			return {
				text: copyright.text,
				type: copyright.type
			};
		}),
		date: new Date(data.release_date),
		genres: data.genres,
		id: data.id,
		images: images(data.images),
		name: data.name,
		popularity: data.popularity,
		tracks: data.tracks.items.map((track: SpotifyApi.TrackObjectSimplified): Track => {
			return {
				artists: track.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
					return {
						id: artist.id,
						name: artist.name,
						type: artist.type,
						uri: artist.uri
					};
				}),
				album: {
					id: data.id,
					name: data.name,
					type: data.type,
					uri: data.uri
				},
				date: new Date(data.release_date),
				duration: track.duration_ms,
				explicit: track.explicit,
				id: track.id,
				local: false,
				name: track.name,
				number: track.track_number,
				popularity: data.popularity,
				type: track.type,
				uri: track.uri
			};
		}),
		type: data.type,
		uri: data.uri
	};
}

export function containsSavedAlbums(ids: string[], data: SpotifyApi.CheckUserSavedAlbumsResponse): FollowersResponse {
	return {
		followers: data.map((following: boolean, index: number): Follower => {
			return {
				id: ids[index],
				following: following
			};
		})
	};
}
