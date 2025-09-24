import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js"
import APIFILTERS from "../utils/apiFilters.js";
import ErrorHadler from "../utils/error_handler.js";


// Get all Products      =>   /api/v1/products
export const getProducts = catchAsyncErrors( async(req, res, next) =>{
    const resPerPage = 4;
    const apiFilters = new APIFILTERS(Product, req.query).search().filters();

    let product = await apiFilters.query;

    let filterProdCount = product.length;
    apiFilters.pagination(resPerPage);
    product = await apiFilters.query.clone();

    if( !product ) {
        return next(new ErrorHadler("Product not found!", 404))
    }
    res.status(200).json({
        message: "All Products",
        filterProdCount,
        product,
    })
})

// Get Single Product details      =>   /api/v1/products/:id
export const singleProduct = catchAsyncErrors( async(req, res, next) =>{
    const product = await Product.findById(req?.params?.id);
    if( !product ) {
        return next(new ErrorHadler("Product not found!", 404))
    }
    
    res.status(200).json({
        product,
    })
});



// Create new Products      =>   /api/v1/admin/products
export const newProducts = catchAsyncErrors( async(req, res) =>{
    const product = await Product.create(req.body)

    res.status(200).json({
        product,
    })
})

// Update Product details      =>   /api/v1/products/:id
export const updateProduct = catchAsyncErrors( async(req, res, next) =>{
    let product = await Product.findById(req?.params?.id);
    if( !product ) {
        return next(new ErrorHadler("Product not found!", 404))
    }


    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    })

    res.status(200).json({
        product,
    })
});

// Delete Products      =>   /api/v1/admin/products
export const deleteProducts = catchAsyncErrors( async(req, res, next) =>{
    const product = await Product.findById(req?.params?.id);
    if( !product ) {
        return next(new ErrorHadler("Product not found!", 404))
    }
    await product.deleteOne();
    res.status(200).json({
        message: "Product is deleted successfully",
    })
});
