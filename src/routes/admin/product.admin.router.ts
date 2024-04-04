import express from "express";
import productAdminController from "../../controllers/admin/product.admin.controller";
import { uploadImage } from "../../middlewares/uploadImage.middleware";

const productAdminRouter = express.Router();

productAdminRouter
	.get("/", productAdminController.adminGetAllProducts)
	.post(
		"/file-image",
		uploadImage.single("cardImage"),
		productAdminController.adminUploadImageProduct
	)
	.patch("/", productAdminController.adminEditProduct)
	.patch("/:id", productAdminController.adminVisibleProduct)
	.delete("/:id", productAdminController.adminDeleteProduct);

export { productAdminRouter };
