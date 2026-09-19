const Blog = require("../models/blogs-model");
const { ValidateError } = require("../helpers/errors");
const { ResponseFormat } = require("../helpers/response");
const { checkExistAndInvalid } = require("../helpers/utils");

exports.getAllBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    if (checkExistAndInvalid(page, "number")) {
      throw new ValidateError("page is invalid");
    } else if (checkExistAndInvalid(pageSize, "number")) {
      throw new ValidateError("pageSize is invalid");
    }

    const { data, count } = await Blog.getBlogsAsync(page, pageSize);
    const response = new ResponseFormat(data, 200, "", {
      page,
      pageSize,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    });
    res.json(response);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.getBlogById(blogId);

    const response = new ResponseFormat(blog);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, slug, content, status, category_id, published_at } =
      req.body;
    // validate: title, content, slug, excerpt, status
    if (checkExistAndInvalid(title, "string")) {
      throw new ValidateError("title is invalid");
    } else if (checkExistAndInvalid(slug, "string")) {
      throw new ValidateError("slug is invalid");
    } else if (checkExistAndInvalid(content, "string")) {
      throw new ValidateError("content is invalid");
    } else if (status !== undefined && checkExistAndInvalid(status, "string")) {
      throw new ValidateError("status is invalid");
    } else if (
      category_id !== undefined &&
      checkExistAndInvalid(category_id, "string")
    ) {
      throw new ValidateError("category_id is invalid");
    }

    // call model
    const newBlog = new Blog({
      title,
      slug,
      content,
      status,
      category_id,
      published_at,
    });
    const saveBlog = await newBlog.save();
    const response = new ResponseFormat(saveBlog);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
