import express from "express";

const cardsRouter = express.Router();

cardsRouter.get("/"); // Проверка доступности backend

export default cardsRouter;
