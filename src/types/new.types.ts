import { Types } from "mongoose";

export type TNewsSeo = {
	title?: string;
	description?: string;
	keywords?: Types.Array<string>;
};

export type TNews = {
	title: string;
	text: string;
	picture?: string;
	seo?: TNewsSeo;
};

export type TNewsId = {
	_id: string;
};

export type TNewsFull = TNews & TNewsId;
