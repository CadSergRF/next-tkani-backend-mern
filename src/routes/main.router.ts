import express from "express";
import {
	checkReq,
	checkUserLogin,
	login,
	logout,
	registration,
} from "../controllers/auth.controller";
import authUserMW from "../middlewares/authUser.mw";
import cardsRouter from "./cards.router";

const mainRouter = express.Router();

mainRouter.get("/checkReq", checkReq); // Проверка доступности backend
mainRouter.post("/checkuserlogin", authUserMW, checkUserLogin); // Проверка авторизации пользователя
mainRouter.post("/registration", registration);
mainRouter.post("/login", login);
mainRouter.post("/logout", logout);
mainRouter.use("/cards", cardsRouter);

export default mainRouter;
