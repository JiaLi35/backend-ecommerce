const express = require("express");
// create an express router
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

/*
  Routes for products
  GET /products - list all the products
  GET /products/:id - get a specific product
  POST /products - add a new product
  PUT /products/:id - update product
  DELETE /products/:id - delete product
*/

//  GET /products - list all the products
/*
  query params is everything after the ? mark
*/
router.get("/", async (req, res) => {
  // query params
  const category = req.query.category;
  const products = await getProducts(category);

  res.status(200).send(products);
});

//   GET /products/:id - get a specific product
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProduct(id);
  res.status(200).send(product);
});

/*
  POST /products - add a new product
  this POST route need to accept the following parameters
  - name
  - description
  - price
  - category
*/
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if (!name || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required.",
      });
    }

    res
      .status(200)
      // short hand
      .send(await addProduct(name, description, price, category));
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//   PUT /products/:id - update product
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the product from url
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if (!name || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required.",
      });
    }

    res
      .status(200)
      .send(await updateProduct(id, name, description, price, category));
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//   DELETE /products/:id - delete product
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).send({
      message: `Product with the id of ${id} has successfully been deleted.`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
