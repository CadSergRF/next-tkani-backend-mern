export type TParseError = {
	index: number;
	error: string;
};

export type TParseResult = {
	totalItems: number;
	addedItems: number;
	errorsIndexItem: TParseError[];
};
