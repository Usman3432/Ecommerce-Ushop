import express from "express"
import { deleteProducts, getProducts, newProducts, singleProduct, updateProduct } from "../controllers/productController.js"

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProducts);
router.route("/products/:id").get(singleProduct);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProducts);
export default router;