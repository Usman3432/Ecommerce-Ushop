import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFILTERS from "../utils/apiFilters.js";
import ErrorHadler from "../utils/error_handler.js";

// Get all Products      =>   /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const apiFilters = new APIFILTERS(Product, req.query).search().filters();

  let product = await apiFilters.query;

  let filterProdCount = product.length;
  apiFilters.pagination(resPerPage);
  product = await apiFilters.query.clone();

  if (!product) {
    return next(new ErrorHadler("Product not found!", 404));
  }
  res.status(200).json({
    message: "All Products",
    resPerPage,
    filterProdCount,
    product,
  });
});

// Get Single Product details      =>   /api/v1/products/:id
export const singleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHadler("Product not found!", 404));
  }

  res.status(200).json({
    product,
  });
});

// Create new Products      =>   /api/v1/admin/products
export const newProducts = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

// Update Product details      =>   /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHadler("Product not found!", 404));
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});

// Delete Products      =>   /api/v1/admin/products
export const deleteProducts = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHadler("Product not found!", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    message: "Product is deleted successfully",
  });
});

// Create/Update Product Review      =>   /api/v1/review
export const productReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHadler("Product not found!", 404));
  }

  const isReview = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReview) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get Product Review      =>   /api/v1/review
export const getProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHadler("Product not found!", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

// Delete Product Review      =>   /api/v1/admin/review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHadler("Product not found!", 404));
  }

  const reviews = product?.reviews?.filter(
    (r) => r._id.toString() !== req?.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true }
  );
  res.status(200).json({
    success: true,
    product,
  });
});
