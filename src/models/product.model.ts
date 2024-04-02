import { Schema, model, Types } from "mongoose";
import {
	TProduct,
	TProductCharacteristic,
	TProductMainData,
	TProductSeo,
} from "../types/product.types";

const productMainDataSchema = new Schema<TProductMainData>({
	articul: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	oldPrice: Number,
	quantity: Number,
	picture: String,
	description: String,
});

const productCharacteristicSchema = new Schema<TProductCharacteristic>({
	width: Number,
	picture: String,
	color: String,
	countryOfOrigin: String,
	composition: String,
	weight: Number,
});

const productSeaTagsSchema = new Schema<TProductSeo>({
	header: String,
	description: String,
	keyWords: [String],
});

const productSchema = new Schema<TProduct>(
	{
		mainData: productMainDataSchema,
		characteristic: productCharacteristicSchema,
		seoTags: productSeaTagsSchema,
	},
	{
		versionKey: false,
	}
);

export default model<TProduct>("ProductItem", productSchema);
