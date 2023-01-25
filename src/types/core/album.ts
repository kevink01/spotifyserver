import { Copyright, Core, Image, Track } from '.';

export interface Album extends Core {
	artists: Core[];
	copyrights: Copyright[];
	date: Date;
	genres: string[];
	images: Image[];
	popularity: number;
	tracks: Track[];
}
