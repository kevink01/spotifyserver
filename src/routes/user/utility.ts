import SpotifyWebApi from 'spotify-web-api-node';
import { Image } from '../../types/core';

export function me(data: SpotifyApi.CurrentUsersProfileResponse) {
	return {
		country: data.country,
		email: data.email,
		followers: data.followers?.total ?? 0,
		id: data.id,
		images:
			data.images?.map(
				(image: SpotifyApi.ImageObject) =>
					({
						height: image.height ?? 20,
						width: image.width ?? 20,
						url: image.url
					} as Image)
			) ?? [],
		name: data.display_name ?? '',
		product: data.product,
		type: data.type,
		uri: data.uri
	};
}
