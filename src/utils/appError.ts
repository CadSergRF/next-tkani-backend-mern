class AppError extends Error {
	status: string;

	constructor(public message: string, public statusCode: number = 500) {
		super(message);
		this.status = `${statusCode}`;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
