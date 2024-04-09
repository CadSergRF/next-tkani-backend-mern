import { sectionName } from "./../../utils/constants/catalog.constants";
import { Request, Response, NextFunction } from "express";

import ProductItem from "../../models/product.model";
import { TProduct, TProductFull } from "../../types/product.types";

const adminGetAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cards = await ProductItem.find<TProductFull>();
		return res.json(cards);
	} catch (err) {
		console.log(`Ошибка получения всех карточек ${err}`);
		next(err);
	}
};

const adminGetAllSearchProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { section, searchStr, sortStr, paginationLimit, paginationPage } =
			req.query;
		let queryOptions: any = {};
		let limit = 0;
		let offSet = 0;

		if (section !== "Все" || "") {
			queryOptions["configCard.section"] = section;
		}
		if (searchStr) {
			queryOptions["mainData.articul"] = searchStr;
		}
		if (paginationPage && paginationLimit) {
			let page = +paginationPage;
			limit = +paginationLimit;
			offSet = (page - 1) * limit;
		}
		const countTotalCards = await ProductItem.countDocuments(queryOptions);
		const cards = await ProductItem.find<TProductFull>(queryOptions)
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

const adminCreateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cardsParams = req.body;
		const findDuplicate = await ProductItem.findOne<TProductFull>({
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

const adminVisibleProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, visible } = req.body;

	try {
		const card = await ProductItem.findByIdAndUpdate<TProduct>(id, {
			"configCard.visible": visible,
		});
		if (!card) {
			throw new Error(
				"Ошибка обновления. Карточка с указанным id не найдена"
			);
		}
		// return res.send(card);
	} catch (err) {
		console.log(`Ошибка изменения видимости карточки ${err}`);
		next(err);
	}
};

const adminChangePictureProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, link } = req.body;

	try {
		const card = await ProductItem.findByIdAndUpdate<TProduct>(id, {
			"mainData.picture": link,
		});
		if (!card) {
			throw new Error(
				"Ошибка обновления. Карточка с указанным id не найдена"
			);
		}
		// return res.send(card);
	} catch (err) {
		console.log(`Ошибка сохранения изображения карточки ${err}`);
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
			req.body._id,
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
		res.status(200).send({ filename: `${req.file?.originalname}` });
	} catch (err) {
		console.log("Ошибка в контроллере ", err);
		next;
	}
};

export default {
	adminGetAllProducts,
	adminGetAllSearchProducts,
	adminCreateProduct,
	adminDeleteProduct,
	adminVisibleProduct,
	adminChangePictureProduct,
	adminEditProduct,
	adminUploadImageProduct,
};
