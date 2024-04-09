import express from "express";
import productAdminController from "../../controllers/admin/product.admin.controller";
import { uploadImage } from "../../middlewares/uploadImage.middleware";

const productAdminRouter = express.Router();

productAdminRouter
	.get("/", productAdminController.adminGetAllProducts)
	.get("/query", productAdminController.adminGetAllSearchProducts)
	.post(
		"/file-image",
		uploadImage.single("cardImage"),
		productAdminController.adminUploadImageProduct
	)
	.patch("/", productAdminController.adminEditProduct)
	.patch("/:id/visible", productAdminController.adminVisibleProduct)
	.patch("/:id/picture", productAdminController.adminChangePictureProduct)
	.delete("/:id", productAdminController.adminDeleteProduct);

export { productAdminRouter };
