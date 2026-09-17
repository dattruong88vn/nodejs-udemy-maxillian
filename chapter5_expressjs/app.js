const express = require("express");
const shopRouter = require("./routes/shop");
const { getMainModulePath } = require("./helpers/path");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use the shop router for /products routes
app.use("/products", shopRouter);

// Sample route
app.get("/", (req, res, next) => {
  res.sendFile(getMainModulePath() + "/views/index.html");
});

// Middleware to handle invalid routes (404)
app.use((req, res, next) => {
  throw new Error("Page not found"); // Simulate a 404 error
});

// middleware to handle 404 errors
app.use((err, req, res, next) => {
  if (err.message) res.status(404).send(err.message);
  res.status(404).sendFile(getMainModulePath() + "/views/404.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
