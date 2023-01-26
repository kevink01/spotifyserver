import { FullPlaylist, Profile } from '../../types/core';
import { Follower, Image } from '../../types/util';
import { FollowersResponse, PlaylistsResponse } from '../../types/httpResponses';
import { images } from '..';

export function profile(data: SpotifyApi.UserProfileResponse): Profile {
	return {
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
		type: data.type,
		uri: data.uri
	};
}

export function userPlaylists(data: SpotifyApi.ListOfUsersPlaylistsResponse): PlaylistsResponse {
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
				},
				public: playlist.public ?? false,
				snapshot: playlist.snapshot_id,
				tracks: playlist.tracks.total,
				type: playlist.type,
				uri: playlist.uri
			};
		})
	};
}

export function isFollowing(ids: string[], data: SpotifyApi.UserFollowsUsersOrArtistsResponse): FollowersResponse {
	return {
		followers: data.map((value: boolean, index: number): Follower => {
			return {
				id: ids[index],
				following: value
			};
		})
	};
}
