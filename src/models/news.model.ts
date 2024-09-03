import { Schema, model, Types } from "mongoose";
import { TNews, TNewsSeo } from "../types/new.types";

const newsSeoSchema = new Schema<TNewsSeo>(
	{
		title: String,
		description: String,
		keywords: [String],
	},
	{
		versionKey: false,
	}
);

const newsSchema = new Schema<TNews>(
	{
		title: { type: String, required: true },
		text: { type: String, required: true },
		picture: String,
		seo: newsSeoSchema,
	},
	{
		versionKey: false,
	}
);

export default model<TNews>("NewsItem", newsSchema);
