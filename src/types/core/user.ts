import { Profile } from '.';

export interface CurrentUser extends Profile {
	country: string;
	email: string;
	product: string;
}
