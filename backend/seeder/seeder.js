import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js"

const seedProduct = async () => {
    try {
        let DB_URI = "";
        if(process.env.MODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
        if(process.env.MODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;
        await mongoose.connect(DB_URI);
        await Product.deleteMany();
        console.log("Products deleted");
        await Product.insertMany(products);
        console.log("Products added successfully");
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

seedProduct();
