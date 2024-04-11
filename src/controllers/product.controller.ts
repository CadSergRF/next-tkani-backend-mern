import { Request, Response, NextFunction } from "express";

import ProductItem from "../models/product.model";
import { TProductFull } from "../types/product.types";

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

const userGetSearchAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			section,
			picture,
			color,
			searchStr,
			sortStr,
			paginationLimit,
			paginationPage,
		} = req.query;

		let queryOptions: any = {};
		let sortOption: any = {};
		let pictureOption: any = {};
		let colorOption: any = {};
		let limit = 0;
		let offSet = 0;

		if (section !== "Все" || "") {
			queryOptions["configCard.section"] = section;
		}
		if (picture && typeof picture === "string") {
			pictureOption.$in = picture.split(",");
			queryOptions["characteristic.picture"] = pictureOption;
		}
		if (color && typeof color === "string") {
			colorOption.$in = color.split(",");
			queryOptions["characteristic.color"] = colorOption;
		}
		if (searchStr) {
			queryOptions["mainData.articul"] = searchStr;
		}
		if (paginationPage && paginationLimit) {
			let page = +paginationPage;
			limit = +paginationLimit;
			offSet = (page - 1) * limit;
		}
		if (sortStr === "articulDown") {
			sortOption["mainData.articul"] = 1;
		} else if (sortStr === "articulUp") {
			sortOption["mainData.articul"] = -1;
		}

		const countTotalCards = await ProductItem.countDocuments(queryOptions);
		const cards = await ProductItem.find<TProductFull>(queryOptions)
			.sort(sortOption)
			.skip(offSet)
			.limit(limit);
		return res
			.status(200)
			.json({ cards: cards, countTotalCards: countTotalCards });
	} catch (err) {
		console.log(`Ошибка получения всех карточек ${err}`);
		next(err);
	}
};

export default { getAllProducts, userGetSearchAllProducts };
