import { Core } from '.';
import { Image } from '../util';

interface TrackCore extends Core {
	artists: Core[];
	date: Date;
	duration: number;
	explicit: boolean;
	local: boolean;
	number: number;
	popularity: number;
}

interface FullTrackAlbum extends Core {
	date: Date;
	images: Image[];
}

export interface Track extends TrackCore {
	album: Core;
}

export interface FullTrack extends TrackCore {
	album: FullTrackAlbum;
}
