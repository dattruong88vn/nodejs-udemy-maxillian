const express = require("express");
const cors = require("cors");

const blogsRouter = require("./routes/blogs");
const { NotFoundError, ValidateError } = require("./helpers/errors");

// create server
const app = express();

// cors
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded
app.use(express.urlencoded({ extended: true }));

// routes

// home page
app.get("/", (req, res, next) => {
  res.json({ name: "dat" });
});

// /api/blogs
app.use("/api/blogs", blogsRouter);

// error-middleware: resource not found

// error middleware
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ ...err });
  }
  if (err instanceof ValidateError) {
    return res.status(400).json({ ...err });
  }
  // error-middleware: system error
  res.status(500).json({ ...err });
});

// listen
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
