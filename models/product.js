const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  // linkage between the products and categories (similar to SQL foreign key)
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
  },
});

// tv show modal
const Product = model("Product", productSchema);

module.exports = Product;
