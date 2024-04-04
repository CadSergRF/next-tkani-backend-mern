import express from "express";
import { importExportRouter } from "./importExport.admin.router";
import { productAdminRouter } from "./product.admin.router";

const adminRouter = express.Router();

adminRouter
	.use("/io-function", importExportRouter)
	.use("/products", productAdminRouter);

export { adminRouter };
