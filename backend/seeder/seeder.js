import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js"

const seedProduct = async () => {
    try {
        await mongoose.connect("mongodb+srv://ushop_admin:Ushopadminpass@ushop.phkaliq.mongodb.net/Ushop")
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