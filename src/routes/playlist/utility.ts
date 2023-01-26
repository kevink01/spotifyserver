import { spotify } from '../../app';
import { Core, FullPlaylist, FullTrack, Playlist } from '../../types/core';
import { Image, PlaylistDetails } from '../../types/util';
import { FeaturedPlaylistsResponse } from '../../types/httpResponses';
import { images } from '..';

export function playlistTracks(data: SpotifyApi.SinglePlaylistResponse): Promise<Playlist> {
	const calls = Math.floor(data.tracks.total / 100) + 1;
	const offset = Array(calls)
		.fill(null)
		.map((_, i) => i * 100);
	const requests = offset.map((value) => {
		return spotify
			.getPlaylistTracks(data.id, { limit: 100, offset: value })
			.then((data) => {
				return data.body;
			})
			.catch((err) => {
				throw new Error(err);
			});
	});

	return Promise.all(requests).then((responses: SpotifyApi.PlaylistTrackResponse[]) => {
		return Promise.all(
			responses.flatMap((playlist: SpotifyApi.PlaylistTrackResponse): FullTrack[] => {
				return playlist.items.map((item: SpotifyApi.PlaylistTrackObject): FullTrack => {
					return {
						album: {
							date: new Date(item.track?.album.release_date ?? Date.now()),
							id: item.track?.album.id ?? '',
							images:
								item.track?.album.images.map((image: SpotifyApi.ImageObject): Image => {
									return {
										height: image.height ?? 0,
										width: image.width ?? 0,
										url: image.url
									};
								}) ?? [],
							name: item.track?.album.name ?? '',
							type: item.track?.album.type ?? '',
							uri: item.track?.album.uri ?? ''
						},
						artists:
							item.track?.artists.map((artist: SpotifyApi.ArtistObjectSimplified): Core => {
								return { id: artist.id, name: artist.name, type: artist.type, uri: artist.uri };
							}) ?? [],
						date: new Date(item.added_at),
						duration: item.track?.duration_ms ?? 0,
						explicit: item.track?.explicit ?? false,
						id: item.track?.id ?? '0',
						local: item.track?.is_local ?? false,
						name: item.track?.name ?? '',
						number: item.track?.track_number ?? 0,
						popularity: item.track?.popularity ?? 0,
						type: item.track?.type ?? '',
						uri: item.track?.uri ?? ''
					};
				});
			})
		)
			.then((tracks: FullTrack[]): FullPlaylist => {
				return {
					collaborative: data.collaborative,
					description: data.description ?? '',
					id: data.id,
					images: images(data.images),
					name: data.name,
					owner: {
						id: data.owner.id,
						name: data.owner.display_name ?? '',
						type: data.owner.type,
						uri: data.owner.uri
					},
					public: data.public ?? false,
					snapshot: data.snapshot_id,
					tracks: tracks,
					type: data.type,
					uri: data.uri
				};
			})
			.catch((err) => {
				throw new Error(err);
			});
	});
}

export function createPlaylist(data: SpotifyApi.CreatePlaylistResponse): PlaylistDetails {
	return {
		collaborative: data.collaborative,
		description: data.description ?? '',
		id: data.id,
		name: data.name,
		public: data.public ?? false,
		snapshot: data.snapshot_id,
		type: data.type,
		uri: data.uri
	};
}

export function featuredPlaylists(data: SpotifyApi.ListOfFeaturedPlaylistsResponse): FeaturedPlaylistsResponse {
	return {
		message: data.message ?? '',
		playlists: data.playlists.items.map((playlist: SpotifyApi.PlaylistObjectSimplified): FullPlaylist => {
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
				},
				public: playlist.public ?? false,
				snapshot: playlist.snapshot_id,
				tracks: playlist.tracks.total,
				type: playlist.type,
				uri: playlist.uri
			};
		}),
		total: data.playlists.total
	};
}
