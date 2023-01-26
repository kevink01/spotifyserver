import { FullTrack } from '.';
import { Device } from '../util';

export interface Playback {
	device: Device;
	playing: boolean;
	progress: number;
	repeat: string;
	shuffle: boolean;
	track: FullTrack;
}
