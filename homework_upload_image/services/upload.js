// services/upload.service.js
const crypto = require("crypto");
const path = require("path");
const supabase = require("../libs/supabase-client");

const BUCKET_NAME = "images";

async function uploadImageToSupabase(file) {
  const ext = path.extname(file.originalname);
  const fileName = `${crypto.randomUUID()}${ext}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return { path: filePath, url: data.publicUrl };
}

module.exports = { uploadImageToSupabase };
