import express from "express";
import fileCSVController from "../../controllers/admin/fileCSV.controller";
import { uploadCSV } from "../../middlewares/uploadCSV.middleware";

const importExportRouter = express.Router();

// importExportRouter.get("/", fileCSVController.exportToCSV);
importExportRouter.post(
	"/",
	uploadCSV.single("filecsv"),
	fileCSVController.importFromCSV
);

export { importExportRouter };
