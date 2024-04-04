import express from "express";
import { importExportRouter } from "./importExport.admin.router";

const adminRouter = express.Router();

adminRouter.use("/io-function", importExportRouter);

export { adminRouter };
