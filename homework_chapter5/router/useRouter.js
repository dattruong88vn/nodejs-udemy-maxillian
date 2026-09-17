const express = require("express");

const { getMainModulePath } = require("../helpers/path");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(getMainModulePath() + "/views/users.html");
});

module.exports = router;
