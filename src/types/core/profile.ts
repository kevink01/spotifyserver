import { Core } from '.';
import { Image } from '../util';

export interface Profile extends Core {
	followers: number;
	images: Image[];
}
