import { Core, Image } from './';

export interface Profile extends Core {
	followers: number;
	images: Image[];
}
