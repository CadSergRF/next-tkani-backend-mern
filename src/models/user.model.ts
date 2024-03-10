import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

import AuthError from "../utils/appError";
import { AUTH_ERROR_CODE } from "../utils/constants/errorsCode.constants";

export interface IUser {
	name: string;
	role: string;
	email: string;
	password: string;
	phoneNumber: string;
	birthday?: string;
	clientCard?: string;
	address?: {
		postIndex?: string;
		town: string;
		streetHome: string;
		apartment: string;
		floor?: string;
		entrance?: string;
		intercom?: string;
	};
}

export const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			minlength: [3, "Символов в названии должно быть от 3 до 30"],
			maxlength: [100, "Символов в названии должно быть от 3 до 100"],
		},
		role: { type: String, default: "user" },
		email: {
			type: String,
			required: [true, 'Поле "email" должно быть заполнено'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Поле "Пароль" должно быть заполнено'],
			select: false,
		},
		phoneNumber: { type: String, default: "-" },
		birthday: { type: String, default: "-" },
		clientCard: { type: String, default: "-" },
		address: {
			postIndex: { type: String, default: "-" },
			town: { type: String, default: "-" },
			streetHome: { type: String, default: "-" },
			apartment: { type: String, default: "-" },
			floor: { type: String, default: "-" },
			entrance: { type: String, default: "-" },
			intercom: { type: String, default: "-" },
		},
	},
	{
		versionKey: false,
	}
);

export default model<IUser>("user", userSchema);
