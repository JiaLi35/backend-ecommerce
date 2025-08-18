const Product = require("../models/product");

// get multiple products based on category
async function getProducts(category) {
  // filter for category
  let filter = {};

  if (category) {
    filter.category = category;
  }

  const product = await Product.find(filter).sort({ _id: -1 });
  return product;
}

// get a singular product by id
async function getProduct(id) {
  return await Product.findById(id);
}

// add a product
async function addProduct(name, description, price, category) {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  // save the new product into mongodb
  await newProduct.save(); // clicking the "save" button
  return newProduct;
}

// update a product by id
async function updateProduct(id, name, description, price, category) {
  return await Product.findByIdAndUpdate(
    id,
    {
      name: name,
      description: description,
      price: price,
      category: category,
    },
    {
      new: true, // return the updated data
    }
  );
}

// delete a product by id
async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
