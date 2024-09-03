import { Request, Response, NextFunction } from "express";
import OrderModel from "../../models/order.model";
// TODO: ПРОДОЛЖИТЬ
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const orderParams = req.body;
		const newOrder = new OrderModel(orderParams);
		const order = await newOrder.save();
		res.status(201).json(order);
	} catch (err) {
		next(err);
	}
};

export default { createOrder };
