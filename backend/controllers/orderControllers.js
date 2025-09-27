import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/error_handler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";



//Create new Order  => /api/v1/order/new
export const newOrder = catchAsyncErrors(async(req, res, next)=>{
    const {
        orderItems,
        shippingInfo,
        itemPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user._id
    });


    res.status(200).json({
        order
    })
});