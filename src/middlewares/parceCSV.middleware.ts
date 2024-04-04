import * as fs from "fs";
import * as path from "path";
import Papa from "papaparse";

import ProductItem from "../models/product.model";
import { ParsedToReal } from "../helpers/parsedCardTorealCard";
import { TProduct } from "../types/product.types";

const fileParse = async () => {
	const absPath = path.resolve("./");
	const csvFilePath = path.resolve(absPath, "uploads/uploadDB.csv");

	const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
	const parsedData = Papa.parse<TProduct[]>(fileContent, {
		delimiter: ";",
		header: true,
		dynamicTyping: true,
	});
	const arrayParsedCards: TProduct[] = [];
	parsedData.data.forEach((item) =>
		arrayParsedCards.push(ParsedToReal(item))
	);
	arrayParsedCards.splice(-1, 1);
	arrayParsedCards.forEach(async (card) => {
		const findDuplicate = await ProductItem.findOne<TProduct>({
			"mainData.articul": card.mainData.articul,
		});
		if (findDuplicate) {
			console.log("Дубликат", findDuplicate.mainData.articul);
		} else {
			const newProduct = new ProductItem(card);
			newProduct.save();
		}
	});
};

export { fileParse };
