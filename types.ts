export interface FireworkPackage {
	name: string;
	description: string;
	amountOfFireworks: number;
	includes?: Array<string>;
	reloadableShells?: Array<string>;
	repeaters500?: Array<string>;
	repeaters350?: Array<string>;
	repeaters200?: Array<string>;
	rockets?: Array<string>;
	fountains?: Array<string>;
	romanCandles?: Array<string>;
	misc?: Array<string>;
	price: number;
	value: number;
	image: any;
}