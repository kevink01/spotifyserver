import { images } from '..';
import { AlbumSimplified, Artist, Core, FullTrack } from '../../types/core';
import { AlbumsResponse, ArtistsResponse, TracksResponse } from '../../types/core/httpResponses';

export function artist(data: SpotifyApi.SingleArtistResponse): Artist {
	return {
		followers: data.followers.total,
		genres: data.genres,
		id: data.id,
		images: images(data.images),
		name: data.name,
		popularity: data.popularity,
		type: data.type,
		uri: data.uri
	};
}

export function artistAlbums(data: SpotifyApi.ArtistsAlbumsResponse): AlbumsResponse {
	return {
		albums: data.items.map((album: SpotifyApi.AlbumObjectSimplified): AlbumSimplified => {
			return {
				artists: album.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
					return {
						id: artist.id,
						name: artist.name,
						type: artist.type,
						uri: artist.uri
					};
				}),
				date: new Date(album.release_date),
				id: album.id,
				images: images(album.images),
				name: album.name,
				tracks: album.total_tracks,
				type: album.type,
				uri: album.uri
			};
		})
	};
}

export function artistTopTracks(data: SpotifyApi.ArtistsTopTracksResponse): TracksResponse {
	return {
		tracks: data.tracks.map((track: SpotifyApi.TrackObjectFull): FullTrack => {
			return {
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
			};
		})
	};
}

export function relatedArtists(data: SpotifyApi.ArtistsRelatedArtistsResponse): ArtistsResponse {
	return {
		artists: data.artists.map((artist: SpotifyApi.ArtistObjectFull): Artist => {
			return {
				followers: artist.followers.total,
				genres: artist.genres,
				id: artist.id,
				images: images(artist.images),
				name: artist.name,
				popularity: artist.popularity,
				type: artist.type,
				uri: artist.uri
			};
		})
	};
}
