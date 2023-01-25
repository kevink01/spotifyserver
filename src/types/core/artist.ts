import { Core, Image } from './';

export interface Artist extends Core {
	followers: number;
	genres: string[];
	images: Image[];
	popularity: number;
}
