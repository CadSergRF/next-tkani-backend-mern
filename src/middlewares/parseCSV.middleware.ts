import * as fs from "fs";
import * as path from "path";
import Papa from "papaparse";

import ProductItem from "../models/product.model";
import { TProduct } from "../types/product.types";
import { TParseError } from "../types/intern.types";
import { ParsedToReal } from "../helpers/parsedCardToRealCard";
import productAdminController from "../controllers/admin/product.admin.controller";

const fileParse = async () => {
	// Определяем путь до файла
	const absPath = path.resolve("./");
	const csvFilePath = path.resolve(absPath, "uploads/uploadDB.csv");
	// Считываем построчно
	const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
	// Парсим
	const parsedData = Papa.parse<TProduct[]>(fileContent, {
		delimiter: ";",
		header: true,
		dynamicTyping: true,
	});
	// Формируем массив объектов из спарсенных слов
	const arrayParsedCards: TProduct[] = [];
	parsedData.data.forEach((item) =>
		arrayParsedCards.push(ParsedToReal(item))
	);
	// Удаляем последний элемент (особенность парсинга)
	arrayParsedCards.splice(-1, 1);
	// Массив индексов элементов с ошибкой добавления
	const errorsIndexItem: TParseError[] = [];
	// Добавляем в базу через обычный цикл для формирования массива возможных ошибок
	for (let i = 0; i < arrayParsedCards.length; i++) {
		let card = arrayParsedCards[i];
		try {
			const findDuplicate = await ProductItem.findOne<TProduct>({
				"mainData.articul": card.mainData.articul,
			});
			if (findDuplicate) {
				errorsIndexItem.push({
					index: i,
					error: `Дубликат. Артикул: ${findDuplicate.mainData.articul}`,
				});
			} else {
				const newProduct = new ProductItem(card);
				await newProduct.save();
			}
		} catch (error) {
			errorsIndexItem.push({ index: i, error: `${error}` });
		}
	}

	return {
		totalItems: arrayParsedCards.length,
		addedItems: arrayParsedCards.length - errorsIndexItem.length,
		errorsIndexItem: errorsIndexItem,
	};
};

export { fileParse };
