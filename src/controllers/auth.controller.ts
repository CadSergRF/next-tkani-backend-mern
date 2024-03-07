import { CREATED_CODE } from "./../utils/constants/errorsCode";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

import {
	BAD_REQUEST_CODE,
	DUPLICATE_KEY_ERROR,
	NOT_FOUND_CODE,
} from "../utils/constants/errorsCode";

import AppError from "../utils/appError";

const { NODE_ENV, JWT_SECRET } = process.env;

export const checkReq = (req: Request, res: Response) => {
	res.send("Запрос получен");
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
		res.status(CREATED_CODE).send({
			message: "Вы успешно зарегистрировались",
		});
	} catch (err: any) {
		if (err.code === 11000) {
			next(
				new AppError(
					"Пользователь с указанным email уже зарегистрирован.",
					DUPLICATE_KEY_ERROR
				)
			);
			return;
		}
		if (err.name === "ValidationError") {
			const errorMessage = Object.values(err.errors)
				.map((error: any) => error.message)
				.join(" ");
			next(
				new AppError(
					`Не корректные данные при создании пользователя ${errorMessage}`,
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
			throw new AppError("Неправильные почта или пароль", NOT_FOUND_CODE);
		}
		// Проверяем пароль
		const matched = bcrypt.compare(user.password, password);
		if (!matched) {
			throw new AppError("Неправильные почта или пароль", NOT_FOUND_CODE);
		}

		const secretKey: string =
			NODE_ENV && JWT_SECRET && NODE_ENV === "production"
				? JWT_SECRET
				: "some-secret-key";

		const token = jwt.sign({ _id: user._id }, secretKey, {
			expiresIn: "7d",
		});
		// Передаем токен в куки
		res.cookie("ttjwt", token, {
			maxAge: 3600000 * 24 * 7,
			httpOnly: true,
			sameSite: true,
		});
		// Передает в куки флаг LoggedIn с возможностью доступа к флагу
		res.cookie("ttLoggedIn", true, {
			maxAge: 3600000 * 24 * 7,
			httpOnly: false,
			sameSite: true,
		});
		// Предаем статус 200
		res.status(200).send({
			message: "Вы успешно авторизовались на сайте",
		});
	} catch (err: any) {
		if (err.name === "ValidationError") {
			next(new AppError("Ошибка авторизации", BAD_REQUEST_CODE));
		} else {
			next(err);
		}
	}
};

export const logout = (res: Response) => {
	res.clearCookie("ttjwt")
		.clearCookie("ttLoggedIn")
		.send("Вы вышли из аккаунта");
};
