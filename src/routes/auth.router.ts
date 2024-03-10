import express from "express";
import {
	checkReq,
	login,
	logout,
	registration,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/checkReq", checkReq);
authRouter.post("/registration", registration);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
