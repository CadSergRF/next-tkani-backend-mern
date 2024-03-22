import { Schema, model } from "mongoose";

import {
	TUser,
	TUserAddress,
	TUserAuthData,
	TUserFullName,
	TUserMarketingData,
	TUserPersonalData,
} from "../types/user.types";

const fullNameSchema = new Schema<TUserFullName>({
	name: {
		type: String,
		minlength: [3, "Символов в названии должно быть от 3 до 30"],
		maxlength: [30, "Символов в названии должно быть от 3 до 30"],
	},
	surname: {
		type: String,
		minlength: [3, "Символов в названии должно быть от 3 до 30"],
		maxlength: [30, "Символов в названии должно быть от 3 до 30"],
	},
	middleName: {
		type: String,
		default: "-",
		maxlength: [30, "Символов в названии должно быть от 3 до 30"],
	},
});

const personalDataSchema = new Schema<TUserPersonalData>({
	fullName: fullNameSchema,
	birthday: { type: String, default: "-" },
	email: {
		type: String,
		required: [true, 'Поле "email" должно быть заполнено'],
		unique: true,
	},
	phone: { type: String, default: "-" },
});

const addressSchema = new Schema<TUserAddress>({
	postIndex: { type: String, default: "-" },
	town: { type: String, default: "-" },
	streetHome: { type: String, default: "-" },
	apartment: { type: String, default: "-" },
	floor: { type: String, default: "-" },
	entrance: { type: String, default: "-" },
	intercom: { type: String, default: "-" },
});

const authDataSchema = new Schema<TUserAuthData>({
	role: { type: String, default: "user" },
	password: {
		type: String,
		required: [true, 'Поле "Пароль" должно быть заполнено'],
		select: false,
	},
	acceptedCookies: { type: Boolean, default: false },
});

const marketingDataSchema = new Schema<TUserMarketingData>({
	clientCard: { type: String, default: "-" },
});

export const userSchema = new Schema<TUser>(
	{
		// Личные данные пользователя
		personalData: personalDataSchema,
		// Адрес пользователя
		address: addressSchema,
		// Данные разрешения доступа и авторизации
		authData: authDataSchema,
		// Данные для маркетинга
		marketingData: marketingDataSchema,
	},
	{
		versionKey: false,
	}
);

export default model<TUser>("user", userSchema);
