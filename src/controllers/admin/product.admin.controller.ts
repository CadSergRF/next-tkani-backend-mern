import { Request, Response, NextFunction } from "express";

import ProductItem from "../../models/product.model";
import { TProduct } from "../../types/product.types";

const adminGetAllProducts = async (
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

const adminCreateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cardsParams = req.body;
		const findDuplicate = await ProductItem.findOne<TProduct>({
			"mainData.articul": cardsParams.mainData.articul,
		});
		if (findDuplicate) {
			throw new Error(
				"Карточка товара с указанным артикулом уже существует"
			);
		}
		const newProduct = new ProductItem(cardsParams);
		const card = await newProduct.save();
		res.status(200).json(card);
	} catch (err) {
		console.log(`Ошибка создания новой карточки ${err}`);
		next(err);
	}
};

const adminDeleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const card = await ProductItem.findById<TProduct>(req.params.id);
		if (!card) {
			throw new Error("Карточка с указанным id не найдена");
		}
		const cardDelete = await ProductItem.deleteOne(card);
		return res.send(cardDelete);
	} catch (err) {
		console.log(`Ошибка удаления карточки ${err}`);
		next(err);
	}
};

const adminEditProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const card = await ProductItem.findByIdAndUpdate<TProduct>(
			req.body.id,
			req.body
		);
		if (!card) {
			throw new Error(
				"Ошибка обновления. Карточка с указанным id не найдена"
			);
		}
		return res.send(card);
	} catch (err) {
		console.log(`Ошибка удаления карточки ${err}`);
		next(err);
	}
};

const adminUploadImageProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		res.status(200).send({ message: "Файл загружен" });
	} catch (err) {
		console.log("Ошибка в контроллере ", err);
		next;
	}
};

export default {
	adminGetAllProducts,
	adminCreateProduct,
	adminDeleteProduct,
	adminEditProduct,
	adminUploadImageProduct,
};
