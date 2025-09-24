import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js"

const seedProduct = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Ushop")
        await Product.deleteMany();
        console.log("Products deleted");
        await Product.insertMany(products);
        console.log("Products added");
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

seedProduct();