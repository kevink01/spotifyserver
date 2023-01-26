import { Core, Track } from '.';
import { Image } from '../util';

export interface Playlist extends Core {
	collaborative: boolean;
	description: string;
	public: boolean;
	snapshot: string;
}

export interface FullPlaylist extends Playlist {
	images: Image[];
	owner: Core;
	tracks: number | Track[];
}
