import express from "express";
import {
  deleteProducts,
  deleteReview,
  getProductReview,
  getProducts,
  newProducts,
  productReview,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticated, authorizeRoles("admin"), newProducts);
router.route("/products/:id").get(singleProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/products/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProducts);

router
  .route("/reviews")
  .put(isAuthenticated, productReview)
  .get(isAuthenticated, getProductReview);

router
  .route("/admin/review")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteReview);

export default router;
