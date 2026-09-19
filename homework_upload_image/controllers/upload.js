// controllers/upload.controller.js
const { uploadImageToSupabase } = require("../services/upload");

async function uploadImage(req, res) {
  try {
    const result = await uploadImageToSupabase(req.file);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Upload thất bại" });
  }
}

module.exports = { uploadImage };
