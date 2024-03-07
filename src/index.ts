require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import { mongoConfig } from "./utils/connectDB";
import authRouter from "./routes/auth.router";

const app = express();

mongoose.connect(mongoConfig.mongo.url).then(
	() => {
		console.log(
			`Удачное подключение к базе данных: ${mongoConfig.mongo.dbName}`
		);
	},
	(err) => {
		console.log(`Ошибка подключения к базе данных ${err}`);
	}
);

app.use(express.json())
	.use(
		cors({
			origin: "*",
			credentials: true,
		})
	)
	.use(bodyParser.json())
	.use(helmet())
	.use(cookieParser())
	.use("/", authRouter);
// .use('/', shopRoutes)
// .use('/', adminRoutes)

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
	const err = new Error(`Route ${req.originalUrl} not found`) as any;
	err.statusCode = 404;
	next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response) => {
	err.status = err.status || "error";
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

app.listen(mongoConfig.server.port, () => {
	// eslint-disable-next-line no-console
	console.log(`Сервер запущен на ${mongoConfig.server.port} порту`);
});
