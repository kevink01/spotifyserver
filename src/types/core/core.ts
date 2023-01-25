export interface Core {
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface Snapshot {
	snapshot: string;
}

export interface Success {
	success: boolean;
}
