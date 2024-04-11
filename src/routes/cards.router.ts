import express from "express";

import userProductController from "../controllers/product.controller";

const cardsRouter = express.Router();

cardsRouter.get(
	"/search-cards",
	userProductController.userGetSearchAllProducts
); // Проверка доступности backend

export default cardsRouter;
