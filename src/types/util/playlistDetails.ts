import { Core } from '../core';

export interface PlaylistDetails extends Core {
	collaborative: boolean;
	description: string;
	public: boolean;
	snapshot: string;
}
