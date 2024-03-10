import { CREATED_CODE } from "../utils/constants/errorsCode.constants";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

import AppError from "../utils/appError";

import {
	BAD_REQUEST_CODE,
	DUPLICATE_KEY_ERROR,
	NOT_FOUND_CODE,
} from "../utils/constants/errorsCode.constants";

import {
	SuccessMessage,
	ErrorMessage,
} from "../utils/constants/responseMessage.constants";

const { NODE_ENV, JWT_SECRET, COOKIES_TOKEN, COOKIES_LOGIN } = process.env;

export const checkReq = (req: Request, res: Response) => {
	res.json({ message: "Запрос получен" });
};

export const registration = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		name,
		email,
		password,
		role,
		phoneNumber,
		clientCard,
		birthday,
		address,
	} = req.body;

	try {
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			name,
			email,
			password: hashPassword,
			role,
			phoneNumber,
			clientCard,
			birthday,
			address,
		});
		await newUser.save();
		// Формируем ответ сервера
		res.status(CREATED_CODE).json({
			message: `${SuccessMessage.REGISTER_MESSAGE}`,
		});
	} catch (err: any) {
		if (err.code === 11000) {
			next(
				new AppError(ErrorMessage.DUPLICATE_EMAIL, DUPLICATE_KEY_ERROR)
			);
			return;
		}
		if (err.name === "ValidationError") {
			const errorMessage = Object.values(err.errors)
				.map((error: any) => error.message)
				.join(" ");
			next(
				new AppError(
					`${ErrorMessage.BAD_REQUEST_MESSAGE_DATA} ${errorMessage}`,
					BAD_REQUEST_CODE
				)
			);
		} else {
			next(err);
		}
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email }).select("+password");
		// Пользователь есть?
		if (!user) {
			throw new AppError(
				ErrorMessage.BAD_EMAIL_OR_PASSWORD,
				NOT_FOUND_CODE
			);
		}
		// Проверяем пароль
		const matched = bcrypt.compare(user.password, password);
		if (!matched) {
			throw new AppError(
				ErrorMessage.BAD_EMAIL_OR_PASSWORD,
				NOT_FOUND_CODE
			);
		}

		const secretKey: string =
			NODE_ENV && JWT_SECRET && NODE_ENV === "production"
				? JWT_SECRET
				: "some-secret-key";

		const token = jwt.sign({ _id: user._id }, secretKey, {
			expiresIn: "7d",
		});
		// Передаем токен в куки
		const jwtKey: string =
			NODE_ENV && COOKIES_TOKEN && NODE_ENV === "production"
				? COOKIES_TOKEN
				: "jwt";
		res.cookie(jwtKey, token, {
			maxAge: 3600000 * 24 * 7,
			httpOnly: true,
			sameSite: true,
		});
		// Передает в куки флаг LoggedIn с возможностью доступа к флагу
		const loginKey: string =
			NODE_ENV && COOKIES_LOGIN && NODE_ENV === "production"
				? COOKIES_LOGIN
				: "loggedIn";
		res.cookie(loginKey, true, {
			maxAge: 3600000 * 24 * 7,
			httpOnly: false,
			sameSite: true,
		});
		// Предаем статус 200
		res.status(200).send(SuccessMessage.LOGIN_MESSAGE);
	} catch (err: any) {
		if (err.name === "ValidationError") {
			next(new AppError(ErrorMessage.BAD_REQUEST_CODE, BAD_REQUEST_CODE));
		} else {
			next(err);
		}
	}
};

export const logout = (res: Response) => {
	res.clearCookie("ttjwt")
		.clearCookie("ttLoggedIn")
		.send(SuccessMessage.LOGOUT_MESSAGE);
};
