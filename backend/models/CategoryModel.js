const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // 如果没有写入description，就会自动写入defaul
  description: { type: String, default: "default category description" },
  image: { type: String, default: "/images/tablets-category.png" },
  attrs: [{ key: { type: String }, value: [{ type: String }] }],
});

categorySchema.index({description:1})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
