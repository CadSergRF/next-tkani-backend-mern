import { sectionName } from "./../utils/constants/catalog.constants";
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
			sectionName,
			pictureName,
			colorName,
			searchName,
			sortName,
			paginationLimit,
			paginationPage,
		} = req.query;

		let queryOptions: any = {};
		let sortOption: any = {};
		let pictureOption: any = {};
		let colorOption: any = {};
		let limit = 0;
		let offSet = 0;

		if (sectionName !== "Все" || "") {
			queryOptions["configCard.section"] = sectionName;
		}

		if (pictureName && typeof pictureName === "string") {
			pictureOption.$in = pictureName.split(",");
			queryOptions["characteristic.picture"] = pictureOption;
		}

		if (colorName && typeof colorName === "string") {
			colorOption.$in = colorName.split(",");
			queryOptions["characteristic.color"] = colorOption;
		}

		if (searchName) {
			queryOptions = {};
			queryOptions.$or = [
				{
					"mainData.name": {
						$regex: `${searchName}`,
						$options: "i",
					},
				},
				{
					"mainData.articul": {
						$regex: `${searchName}`,
						$options: "i",
					},
				},
				{
					"mainData.description": {
						$regex: `${searchName}`,
						$options: "i",
					},
				},
				{
					"characteristic.color": {
						$regex: `${searchName}`,
						$options: "i",
					},
				},
			];
		}

		if (paginationPage && paginationLimit) {
			let page = +paginationPage;
			limit = +paginationLimit;
			offSet = (page - 1) * limit;
		}
		if (sortName === "priceDown") {
			sortOption["mainData.price"] = -1;
		} else if (sortName === "priceUp") {
			sortOption["mainData.price"] = 1;
		}

		console.log(queryOptions);
		console.log(sortOption);

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
