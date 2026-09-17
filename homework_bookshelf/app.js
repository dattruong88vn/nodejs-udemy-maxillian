const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/book");

const app = express();
const PORT = 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Book routes
app.use("/api/books", bookRoutes);

// Error handling middleware 4xx
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  next(err); // không phải lỗi này thì chuyển tiếp
});

// System Error middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  return res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
