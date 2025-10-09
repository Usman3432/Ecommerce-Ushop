import express from "express";
const app = express();
app.set("query parser", "extended");
import dotenv from "dotenv";
import productRoutes from "./rotues/productRouter.js";
import cookieParser from "cookie-parser";
import authRoutes from "./rotues/userRoutes.js";
import orderRoutes from "./rotues/orderRoutes.js"
import { dbConnection } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/error.js";


//Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

//Database connection
dbConnection();
app.use(express.json({ limit: '3mb' }));
app.use(cookieParser());

//Import all routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);

//Using error Middlewares
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handle unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
