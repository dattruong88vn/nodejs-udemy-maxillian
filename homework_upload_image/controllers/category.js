const Category = require("../models/category");

exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Category.getCategoryById(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateImageCategory = async (req, res, next) => {
  console.log(123);

  const { id } = req.params;
  const { image_url } = req.body;

  console.log({ id, image_url });

  try {
    const data = await Category.updateImageCategory(id, image_url);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
