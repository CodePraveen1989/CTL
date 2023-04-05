const mongoose = require("mongoose");
//我们需要usermodel，因为我们需要知道谁下的订单
const User = require("./UserModel");

const orderSchema = mongoose.Schema(
  {
    user: {
      //ObjectID is going to be the ID of the user that has created the order and required througth.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //下面的user的东西，就直接从UserModel调用了。
      // this field user refers to user model.
      ref: User,
    },
    orderTotal: {
      itemsCount: { type: Number, required: true },
      cartSubtotal: { type: Number, required: true },
    },
    cartItems: [
      {
        productID: { type: String, required: false },
        name: { type: String, required: true },
        cartProducts: [
          {
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            count: { type: Number, required: true },
            ctlsku: { type: String, required: false },
            attrs: { type: String, required: false },
            // ID: { type: String, required: false },
          },
        ],
        image: { path: { type: String, required: true } },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    purchaseNumber: {
      type: String,
      required: false,
    },
    invoiceNumber: {
      type: String,
      required: false,
    },
    transactionResult: {
      status: { type: String },
      createTime: { type: String },
      amount: { type: Number },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
