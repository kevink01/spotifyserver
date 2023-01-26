import { Core, Track } from '.';
import { Copyright, Image } from '../util';

export interface Album extends Core {
	artists: Core[];
	date: Date;
	images: Image[];
	tracks: number | Track[];
}

export interface FullAlbum extends Album {
	copyrights: Copyright[];
	genres: string[];
	popularity: number;
}
