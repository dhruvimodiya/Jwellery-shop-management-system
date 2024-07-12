const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create a New order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems,  itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(), user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    })
})

//Get Single Order 
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    //we have to send order id to get the details
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order Not Found with this ID", 404))
    }
    res.status(200).json({
        success: true,
        order
    })
})

//Get logged in user Orders  (Order History)
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })
})

//Get All Orders --admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmounut = 0;
    orders.forEach(order => {
        totalAmounut += order.totalPrice
    })
    res.status(200).json({
        success: true,
        orders,
        totalAmounut
    })
})

//Update Order status --admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("Order Not Found with this ID", 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async o => {
            await updateStock(o.product, o.quantity);
        })
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false })
}


//Delete Order --admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    await order.deleteOne();
    if (!order) {
        return next(new ErrorHandler("Order Not Found with this ID", 404))
    }

    res.status(200).json({
        success: true
    })
})