import express from "express";
import { newOrder } from "../controllers/orderControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticated ,newOrder);

export default router;