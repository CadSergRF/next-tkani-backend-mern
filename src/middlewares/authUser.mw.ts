import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { ErrorMessage } from "../utils/constants/responseMessage.constants";
import { AUTH_ERROR_CODE } from "../utils/constants/errorsCode.constants";
import jwt from "jsonwebtoken";

const { NODE_ENV, JWT_SECRET } = process.env;

const authUserMW = (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.body;
	if (!token) {
		return next(new AppError(ErrorMessage.AUTH_MESSAGE, AUTH_ERROR_CODE));
	}

	let payload;

	try {
		payload = jwt.verify(
			token,
			NODE_ENV && JWT_SECRET && NODE_ENV === "production"
				? JWT_SECRET
				: "some-secret-key"
		);
	} catch (err) {
		return next(new AppError(ErrorMessage.AUTH_MESSAGE, AUTH_ERROR_CODE));
	}

	req.body.token = payload;
	return next();
};

export default authUserMW;
