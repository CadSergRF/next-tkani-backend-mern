import ProductItem from "../../models/product.model";

import { Request, Response, NextFunction } from "express";
// import { json2csv } from "json-2-csv";
import { fileParse } from "../../middlewares/parceCSV.middleware";

// const exportToCSV = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const cards = await ProductItem.find();
// 		// console.log("cards", cards);
// 		const csvExport = json2csv(cards);

// 		console.log(csvExport);

// 		res.setHeader("Content-Type", "text/csv")
// 			.setHeader(
// 				"Content-Disposition",
// 				"attachment: filename=productBase.csv"
// 			)
// 			.status(200)
// 			.send(csvExport);
// 	} catch (err) {
// 		console.log(`Ошибка экспорта базы данных в csv: ${err}`);
// 		next;
// 	}
// };

const importFromCSV = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		fileParse();
		res.status(200).send({ message: "Файл загружен" });
	} catch (err) {
		console.log("Ошибка в контроллере ", err);
		next;
	}
};

// export default { exportToCSV };
export default { importFromCSV };
