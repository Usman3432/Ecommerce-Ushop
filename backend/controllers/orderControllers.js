import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/error_handler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";

//Create new Order  => /api/v1/order/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

// Get order Details        => /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order did not found with this id", 404));
  }

  res.status(200).json({
    order,
  });
});

// Get current user orders        => /api/v1/me/orders
export const userOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  res.status(200).json({
    order,
  });
});

// Get all Order       --ADMIN        => /api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new ErrorHandler("Order did not found. Try Again!!!", 404));
  }

  res.status(200).json({
    orders,
  });
});

// Update Order       --ADMIN        => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler("Order did not found with this id. Try Again!!!", 404)
    );
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }
  order?.orderItems?.forEach(async(item) =>{
    const product = await Product.findById(item?.product?.toString());
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  })

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true
  });
});


// Delete Order       --ADMIN        => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order did not found with this id. Try Again!!!", 404));
  }

  await order.deleteOne();


  res.status(200).json({
    message: "Order successfully deleted!",
  });
});
