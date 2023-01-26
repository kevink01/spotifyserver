import { Copyright, Core, Image, Track } from '.';

export interface AlbumSimplified extends Core {
	artists: Core[];
	date: Date;
	images: Image[];
	tracks: number | Track[];
}

export interface AlbumFull extends AlbumSimplified {
	copyrights: Copyright[];
	genres: string[];
	popularity: number;
}
