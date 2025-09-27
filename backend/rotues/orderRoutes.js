import express from "express";
import { getOrderDetails, newOrder, userOrderDetails } from "../controllers/orderControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticated ,newOrder);
router.route("/order/:id").get(isAuthenticated , getOrderDetails);
router.route("/me/orders").get(isAuthenticated , userOrderDetails);

export default router;