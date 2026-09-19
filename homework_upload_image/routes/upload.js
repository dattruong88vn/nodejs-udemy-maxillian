const express = require("express");

const uploadController = require("../controllers/upload");
const { upload } = require("../helpers/upload");

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("avatar"), uploadController.uploadImage);

module.exports = uploadRouter;
