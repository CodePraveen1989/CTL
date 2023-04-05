const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: ObjectId(req.user._id) });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt")
      .orFail();
    res.send(order);
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    // 如果要加新元素，就在这里写
    const {
      cartItems,
      orderTotal,
      paymentMethod,
      purchaseNumber,
      invoiceNumber,
    } = req.body;
    if (
      !cartItems ||
      !orderTotal ||
      !paymentMethod ||
      !purchaseNumber ||
      !invoiceNumber
    ) {
      return res.status(400).send("All inputs are required");
    }

    // add quanity on SALES
    for (const item of cartItems) {
      const productId = item.cartProducts[0]._id;
      const product = await Product.findOne({
        "stock._id": productId,
      });
      const stockItem = product.stock.find((stock) =>
        stock._id.equals(productId)
      );
      stockItem.sales += Number(item.cartProducts[0].quantity);
      await product.save();
    }

    const order = new Order({
      // 新元素
      user: ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
      purchaseNumber: purchaseNumber,
      invoiceNumber: invoiceNumber,
    });
    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // Subtract the quantity of ordered products from the count in stock
    for (const item of order.cartItems) {
      const productId = item.cartProducts[0]._id;
      const product = await Product.findOne({
        "stock._id": productId,
      });
      const stockItem = product.stock.find((stock) =>
        stock._id.equals(productId)
      );
      stockItem.count -= Number(item.cartProducts[0].quantity);
      await product.save();
    }

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ createdAt: "asc" });
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

const getOrderForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999);

    const order = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: "asc" });
    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderForAnalysis,
};
