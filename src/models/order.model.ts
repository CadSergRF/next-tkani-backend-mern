import { Schema, model, Types } from "mongoose";
import {
	TOrder,
	TOrderCartItem,
	TOrderCustomerAddress,
	TOrderCustomerData,
	TOrderProduct,
} from "../types/order.types";

const orderProductSchema = new Schema<TOrderProduct>(
	{
		_id: String,
		mainData: {
			articul: String,
			name: String,
			price: String,
			oldPrice: Number,
			picture: String,
		},
		configCard: {
			promo: { type: Boolean },
			section: { type: String },
			measure: { type: String },
		},
	},
	{
		versionKey: false,
	}
);

const orderCartItemSchema = new Schema<TOrderCartItem>(
	{
		cartProduct: orderProductSchema,
		orderQuantity: Number,
	},
	{
		versionKey: false,
	}
);

const orderCustomerDataSchema = new Schema<TOrderCustomerData>(
	{
		name: String,
		phoneNumber: String,
		email: String,
	},
	{
		versionKey: false,
	}
);

const orderCustomerAddressSchema = new Schema<TOrderCustomerAddress>(
	{
		postIndex: String,
		town: String,
		streetHome: String,
		houseNumber: String,
		apartment: String,
		floor: String,
		entrance: String,
		intercom: String,
	},
	{
		versionKey: false,
	}
);

const orderSchema = new Schema<TOrder>(
	{
		cart: [orderCartItemSchema],
		customerData: orderCustomerDataSchema,
		customerAddress: orderCustomerAddressSchema,
		deliveryType: { type: String, required: true },
		privacyPolicy: { type: String, required: true },
	},
	{
		versionKey: false,
	}
);

export default model<TOrder>("OrderModel", orderSchema);
