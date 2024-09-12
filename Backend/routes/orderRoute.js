import express from "express"
import {placeOrder,verifyOrder,userOrders, listOrders,updateStatus} from "../controllers/orderController.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"
const frontend_url = "https://food-del-e9ds.onrender.com";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post(`${frontend_url}/verify`,verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
export default orderRouter;