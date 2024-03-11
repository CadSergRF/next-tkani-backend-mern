import express from "express";
import {
	checkReq,
	checkUserLogin,
	login,
	logout,
	registration,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/checkReq", checkReq); // Проверка доступности backend
authRouter.get("/checkuserlogin", checkUserLogin); // Проверка авторизации пользователя
authRouter.post("/registration", registration);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
