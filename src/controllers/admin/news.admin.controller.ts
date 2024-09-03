import { Request, Response, NextFunction } from "express";

import NewsItem from "../../models/news.model";
import { TNewsFull } from "../../types/new.types";

const adminGetAllNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const news = await NewsItem.find<TNewsFull>();
		return res.json(news);
	} catch (err) {
		console.log(`Ошибка получения всех новостей ${err}`);
		next(err);
	}
};

const adminCreateNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const newsParams = req.body;
		const newNews = new NewsItem(newsParams);
		const news = await newNews.save();
		console.log("Новость", news);
		res.status(200).json(news);
	} catch (err) {
		console.log(`Ошибка создания записи ${err}`);
		next(err);
	}
};

const adminDeleteNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const news = await NewsItem.findById<TNewsFull>(req.params.id);
		if (!news) {
			throw new Error("Запись не найдена");
		}
		const newsDelete = await NewsItem.deleteOne(news);
		return res.send(newsDelete);
	} catch (err) {
		console.log(`Ошибка удаления записи ${err}`);
		next(err);
	}
};

const adminEditNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const news = await NewsItem.findByIdAndUpdate<TNewsFull>(
			req.body._id,
			req.body
		);
		if (!news) {
			throw new Error("Ошибка обновления. Запись не найдена");
		}
		return res.send(news);
	} catch (err) {
		console.log(`Ошибка удаления записи ${err}`);
		next(err);
	}
};

export default {
	adminGetAllNews,
	adminCreateNews,
	adminDeleteNews,
	adminEditNews,
};
