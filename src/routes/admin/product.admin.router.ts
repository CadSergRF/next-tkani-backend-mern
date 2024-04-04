import express from "express";
import productAdminController from "../../controllers/admin/product.admin.controller";

const productAdminRouter = express.Router();

productAdminRouter.get("/", productAdminController.adminGetAllProducts);

export { productAdminRouter };
