import express from "express";
import orderController from "../../controllers/order/order.controller";

const orderRouter = express.Router();

orderRouter.post("/dispatch", orderController.createOrder);

export default orderRouter;
