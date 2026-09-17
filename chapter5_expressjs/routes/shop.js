const express = require("express");

const router = express.Router();

// Route to display the add product form
router.get("/add", (req, res, next) => {
  res.send(
    `<form action="/products" method="POST">
      <label for="name">Product Name:</label>
      <input type="text" id="name" name="name" required />
      <br />
      <label for="price">Price:</label>
      <input type="number" id="price" name="price" required />
      <br />
      <button type="submit">Add Product</button>
    </form>`,
  );
});

router.post("/", (req, res, next) => {
  const { name, price } = req.body;
  console.log(`Received product: ${name}, Price: ${price}`);
  res.send(`<h1>Product Added</h1><p>Name: ${name}</p><p>Price: ${price}</p>`);
});

router.get("/", () => {
  throw new Error("This is a test error"); // Simulate an error for testing
});

module.exports = router;
