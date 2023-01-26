import { FullPlaylist, Profile } from '../../types/core';
import { FollowersResponse, PlaylistsResponse } from '../../types/httpResponses';
import { Follower } from '../../types/util';
import { images } from '..';

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

export function profile(data: SpotifyApi.UserProfileResponse): Profile {
	return {
		followers: data.followers?.total ?? 0,
		id: data.id,
		images: images(data.images ?? []),
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
