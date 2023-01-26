import { Core } from '.';
import { Image } from '../util';

export interface Artist extends Core {
	followers: number;
	genres: string[];
	images: Image[];
	popularity: number;
}
