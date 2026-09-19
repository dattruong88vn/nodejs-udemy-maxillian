const express = require("express");

const blogController = require("../controllers/blogs-controller");

const blogsRouter = express.Router();

// get all blog
blogsRouter.get("/", blogController.getAllBlogs);

// get blog by id
blogsRouter.get("/:id", blogController.getBlogById);

// create new blog
blogsRouter.post("/create", blogController.createBlog);

module.exports = blogsRouter;
