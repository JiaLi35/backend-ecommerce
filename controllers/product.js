const Product = require("../models/product");

// get multiple products based on category
async function getProducts(category, page = 1, itemsPerPage = 6) {
  // filter for category
  let filter = {};

  if (category) {
    filter.category = category;
  }

  const product = await Product.find(filter)
    .populate("category")
    .limit(itemsPerPage) // limit the number of items shown
    .skip((page - 1) * itemsPerPage) // skip the amount of items
    .sort({ _id: -1 });
  return product;
}

// get a singular product by id
async function getProduct(id) {
  return await Product.findById(id);
}

// add a product
async function addProduct(name, description, price, category, image) {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    image,
  });
  // save the new product into mongodb
  await newProduct.save(); // clicking the "save" button
  return newProduct;
}

// update a product by id
async function updateProduct(id, name, description, price, category, image) {
  return await Product.findByIdAndUpdate(
    id,
    {
      name: name,
      description: description,
      price: price,
      category: category,
      image: image,
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
