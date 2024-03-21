import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../utils/constants/errorsCode.constants";
import { ErrorMessage } from "../utils/constants/responseMessage.constants";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
	const message =
		statusCode === INTERNAL_SERVER_ERROR
			? ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE
			: err.message;

	res.status(statusCode).json({ message: message });
	return next();
};

export default errorHandler;
