import express from "express";
import {
    deleteOrder,
  getAllOrders,
  getOrderDetails,
  getSales,
  newOrder,
  updateOrder,
  userOrderDetails,
} from "../controllers/orderControllers.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getOrderDetails);
router.route("/me/orders").get(isAuthenticated, userOrderDetails);


router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

router
  .route("/admin/get_sales")
  .get(isAuthenticated, authorizeRoles("admin"), getSales)
export default router;
