const express = require("express");
const cors = require("cors");

const uploadRouter = require("./routes/upload");
const categoryRouter = require("./routes/category");

const app = express();

// cors
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api/upload", uploadRouter);

// update categories supabase
app.use("/category", categoryRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
