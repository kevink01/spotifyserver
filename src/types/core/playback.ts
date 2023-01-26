import { Device, FullTrack } from '.';

export interface Playback {
	device: Device;
	playing: boolean;
	progress: number;
	repeat: string;
	shuffle: boolean;
	track: FullTrack;
}
