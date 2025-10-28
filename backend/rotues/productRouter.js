import express from "express";
import {
  canUserReview,
  deleteProducts,
  deleteReview,
  getAdminProducts,
  getProductReview,
  getProducts,
  newProducts,
  productImageUpload,
  productReview,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticated, authorizeRoles("admin"), newProducts)
  .get(isAuthenticated, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/products/:id/upload_image")
  .put(isAuthenticated, authorizeRoles("admin"), productImageUpload);
router
  .route("/admin/product/new")
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

router.route("/can_review").get(isAuthenticated, canUserReview);

router
  .route("/admin/review")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteReview);

export default router;
