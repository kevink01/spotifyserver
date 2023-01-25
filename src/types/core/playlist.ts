import { Core, Image, Track } from './';

export interface Playlist extends Core {
	collaborative: boolean;
	description: string;
	images: Image[];
	owner: Core;
	public: boolean;
	snapshot: string;
	tracks: number | Track[];
}
