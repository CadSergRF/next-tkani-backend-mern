import { CREATED_CODE } from "../utils/constants/errorsCode.constants";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

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
import { TUser } from "../types/user.types";
import {
	handleCreateUser,
	handleResShortUserData,
} from "../utils/helpers/user.helper";

const findUser = async (data: string) => {
	try {
		const user = await User.findById(data);
		if (!user) {
			throw new AppError(ErrorMessage.NOT_FOUND_USER, NOT_FOUND_CODE);
		}
		return user;
	} catch (error) {
		throw new AppError(ErrorMessage.BAD_REQUEST_MESSAGE_ID, NOT_FOUND_CODE);
	}
};

export const checkReq = (req: Request, res: Response, next: NextFunction) => {
	res.json({ message: "Запрос получен" });
	next();
};

export const checkUserLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { token } = req.body;
		const user = await findUser(token._id);
		if (!user) {
			throw new AppError(ErrorMessage.NOT_FOUND_USER, NOT_FOUND_CODE);
		}

		const shortUserData = handleResShortUserData(user.toObject());

		res.status(200).json(shortUserData);
	} catch (err) {
		next(err);
	}
};

export const registration = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const createUserObject: TUser = await handleCreateUser(req.body);
		const newUser = await User.create(createUserObject);
		await newUser.save();

		// Формируем ответ сервера
		const shortUserData = handleResShortUserData(newUser.toObject());

		res.status(CREATED_CODE).json(shortUserData);
	} catch (err: any) {
		if (err.code === 11000) {
			console.log(err);
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
	console.log("login", req.body);

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ "personalData.email": email }).select(
			"+authData.password"
		);
		// Пользователь есть?
		if (!user) {
			throw new AppError(
				ErrorMessage.BAD_EMAIL_OR_PASSWORD,
				NOT_FOUND_CODE
			);
		}
		// Проверяем пароль
		const matched = bcrypt.compare(user.authData.password, password);

		if (!matched) {
			throw new AppError(
				ErrorMessage.BAD_EMAIL_OR_PASSWORD,
				NOT_FOUND_CODE
			);
		}

		const shortUserData = handleResShortUserData(user.toObject());

		res.status(200).json(shortUserData);
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
