import { Album, FullAlbum } from '../core';

export interface AlbumsResponse {
	albums: Album[] | FullAlbum[];
}
