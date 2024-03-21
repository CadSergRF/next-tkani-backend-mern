class AppError extends Error {
	status: string;

	constructor(public message: string, public statusCode: number) {
		super(message);
		this.status = `${statusCode}`;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
