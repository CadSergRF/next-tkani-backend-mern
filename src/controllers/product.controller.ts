import { Request, Response, NextFunction } from "express";

import ProductItem from "../models/product.model";

const getAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cards = await ProductItem.find();
		console.log("cards ", cards);
		return res.json(cards);
	} catch (err) {
		console.log(`Ошибка получения всех карточек ${err}`);
		next(err);
	}
};

export default { getAllProducts };
