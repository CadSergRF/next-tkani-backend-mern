import express from "express";
import newsAdminController from "../../controllers/admin/news.admin.controller";

const newsAdminRouter = express.Router();

newsAdminRouter
	.get("/", newsAdminController.adminGetAllNews)
	.post("/", newsAdminController.adminCreateNews)
	.patch("/", newsAdminController.adminEditNews)
	.delete("/:id", newsAdminController.adminDeleteNews);

export { newsAdminRouter };
