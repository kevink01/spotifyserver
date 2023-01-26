import { AlbumFull, AlbumSimplified } from '..';

export interface AlbumsResponse {
	albums: AlbumSimplified[] | AlbumFull[];
}
