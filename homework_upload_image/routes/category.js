const express = require("express");

const categoryController = require("../controllers/category");

const categoryRoute = express.Router();

categoryRoute.get("/:id", categoryController.getCategoryById);

categoryRoute.put("/:id", categoryController.updateImageCategory);

module.exports = categoryRoute;
