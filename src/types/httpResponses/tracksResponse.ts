import { FullTrack, Track } from '../core';

export interface TracksResponse {
	tracks: Track[] | FullTrack[];
}
