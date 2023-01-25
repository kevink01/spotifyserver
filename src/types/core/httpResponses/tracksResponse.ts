import { FullTrack, Track } from '..';

export interface TracksResponse {
	tracks: Track[] | FullTrack[];
}
