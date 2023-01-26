import { FullAlbum, Artist, Core, CurrentUser, FullTrack, Playlist, Track, FullPlaylist } from '../../types/core';
import { Copyright, Image } from '../../types/util';
import { AlbumsResponse, ArtistsResponse, PlaylistsResponse, TracksResponse } from '../../types/httpResponses';
import { spotify } from '../../app';
import { images } from '..';

export function me(data: SpotifyApi.CurrentUsersProfileResponse): CurrentUser {
	return {
		country: data.country,
		email: data.email,
		followers: data.followers?.total ?? 0,
		id: data.id,
		images:
			data.images?.map((image: SpotifyApi.ImageObject): Image => {
				return {
					height: image.height ?? 0,
					width: image.width ?? 0,
					url: image.url
				};
			}) ?? [],
		name: data.display_name ?? '',
		product: data.product,
		type: data.type,
		uri: data.uri
	};
}

export function playlists(data: SpotifyApi.ListOfCurrentUsersPlaylistsResponse): PlaylistsResponse {
	return {
		playlists: data.items.map((playlist: SpotifyApi.PlaylistObjectSimplified): FullPlaylist => {
			return {
				collaborative: playlist.collaborative,
				description: playlist.description ?? '',
				id: playlist.id,
				images: images(playlist.images),
				name: playlist.name,
				owner: {
					id: playlist.owner.id,
					name: playlist.owner.display_name ?? '',
					type: playlist.owner.type,
					uri: playlist.owner.uri
				} as Core,
				public: playlist.public ?? false,
				snapshot: playlist.snapshot_id,
				tracks: playlist.tracks.total,
				type: playlist.type,
				uri: playlist.uri
			};
		})
	};
}

export function artists(data: SpotifyApi.UsersFollowedArtistsResponse): ArtistsResponse {
	return {
		artists: data.artists.items.map((artist: SpotifyApi.ArtistObjectFull): Artist => {
			return {
				followers: artist.followers.total,
				genres: artist.genres,
				id: artist.id,
				images: artist.images.map((image: SpotifyApi.ImageObject): Image => {
					return {
						height: image.height ?? 0,
						width: image.width ?? 0,
						url: image.url
					};
				}),
				name: artist.name,
				popularity: artist.popularity,
				type: artist.type,
				uri: artist.uri
			};
		})
	};
}

export function albums(data: SpotifyApi.UsersSavedAlbumsResponse): AlbumsResponse {
	return {
		albums: data.items.map((item: SpotifyApi.SavedAlbumObject): FullAlbum => {
			return {
				artists: item.album.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
					return {
						id: artist.id,
						name: artist.name,
						type: artist.type,
						uri: artist.uri
					};
				}),
				copyrights: item.album.copyrights.map((copyright: SpotifyApi.CopyrightObject): Copyright => {
					return { text: copyright.text, type: copyright.type };
				}),
				date: new Date(item.album.release_date),
				genres: item.album.genres,
				id: item.album.id,
				images: item.album.images.map((image: SpotifyApi.ImageObject): Image => {
					return {
						height: image.height ?? 0,
						width: image.width ?? 0,
						url: image.url
					};
				}),
				name: item.album.name,
				popularity: item.album.popularity,
				tracks: item.album.tracks.items.map((track: SpotifyApi.TrackObjectSimplified): Track => {
					return {
						album: {
							id: item.album.id,
							name: item.album.name,
							type: item.album.type,
							uri: item.album.uri
						},
						artists: track.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
							return {
								id: artist.id,
								name: artist.name,
								type: artist.type,
								uri: artist.uri
							};
						}),
						date: new Date(item.album.release_date),
						duration: track.duration_ms,
						explicit: track.explicit,
						id: track.id,
						local: false,
						name: track.name,
						number: track.track_number,
						popularity: item.album.popularity,
						type: track.type,
						uri: track.uri
					};
				}),
				type: item.album.type,
				uri: item.album.uri
			};
		})
	};
}

export function topTracks(data: SpotifyApi.UsersTopTracksResponse): TracksResponse {
	return {
		tracks: data.items.map((track: SpotifyApi.TrackObjectFull): Track => {
			return {
				album: {
					id: track.album.id,
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

export function topArtists(data: SpotifyApi.UsersTopArtistsResponse): ArtistsResponse {
	return {
		artists: data.items.map((artist: SpotifyApi.ArtistObjectFull): Artist => {
			return {
				followers: artist.followers.total,
				genres: artist.genres,
				id: artist.id,
				images: artist.images.map((image: SpotifyApi.ImageObject): Image => {
					return {
						height: image.height ?? 0,
						width: image.width ?? 0,
						url: image.url
					};
				}),
				name: artist.name,
				popularity: artist.popularity,
				type: artist.type,
				uri: artist.uri
			};
		})
	};
}

export function recentTracks(data: SpotifyApi.UsersRecentlyPlayedTracksResponse): TracksResponse {
	return {
		tracks: data.items.map((item: SpotifyApi.PlayHistoryObject): FullTrack => {
			return {
				album: {
					date: new Date(item.track.album.release_date),
					id: item.track.album.id,
					images: item.track.album.images.map((image: SpotifyApi.ImageObject): Image => {
						return {
							height: image.height ?? 0,
							width: image.width ?? 0,
							url: image.url
						};
					}),
					name: item.track.album.name,
					type: item.track.album.type,
					uri: item.track.album.uri
				},
				artists: item.track.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
					return {
						id: artist.id,
						name: artist.name,
						type: artist.type,
						uri: artist.uri
					};
				}),
				date: new Date(item.played_at),
				duration: item.track.duration_ms,
				explicit: item.track.explicit,
				id: item.track.id,
				local: item.track.is_local ?? false,
				name: item.track.name,
				number: item.track.track_number,
				popularity: item.track.popularity,
				type: item.track.type,
				uri: item.track.uri
			};
		})
	};
}

export function savedTracks(data: SpotifyApi.UsersSavedTracksResponse): Promise<TracksResponse> {
	const calls = Math.floor(data.total / 50) + 1;
	const offset = Array(calls)
		.fill(null)
		.map((_, i) => i * 50);
	const requests = offset.map((value) => {
		return spotify
			.getMySavedTracks({ limit: 50, offset: value })
			.then((data) => {
				return data.body;
			})
			.catch((err) => {
				throw new Error(err);
			});
	});

	return Promise.all(requests).then((responses: SpotifyApi.UsersSavedTracksResponse[]) =>
		Promise.all(
			responses.flatMap((r: SpotifyApi.UsersSavedTracksResponse) => {
				return r.items.map((item: SpotifyApi.SavedTrackObject): FullTrack => {
					return {
						album: {
							date: new Date(item.track.album.release_date),
							id: item.track.album.id,
							images: item.track.album.images.map((image: SpotifyApi.ImageObject): Image => {
								return {
									height: image.height ?? 0,
									width: image.width ?? 0,
									url: image.url
								};
							}),
							name: item.track.album.name,
							type: item.track.album.type,
							uri: item.track.album.uri
						},
						artists: item.track.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
							return {
								id: artist.id,
								name: artist.name,
								type: artist.type,
								uri: artist.uri
							};
						}),
						date: new Date(item.added_at),
						duration: item.track.duration_ms,
						explicit: item.track.explicit,
						id: item.track.id,
						local: item.track.is_local ?? false,
						name: item.track.name,
						number: item.track.track_number,
						popularity: item.track.popularity,
						type: item.track.type,
						uri: item.track.uri
					};
				});
			})
		)
			.then((tracks) => {
				return {
					tracks: tracks
				};
			})
			.catch((err) => {
				throw new Error(err);
			})
	);
}
