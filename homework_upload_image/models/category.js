const supabase = require("../libs/supabase-client");

class Category {
  static async getCategoryById(id) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      // no row found
      if (error.code === "PGRST116") {
        throw new NotFoundError("Post not found");
      } else if (error.code === "22P02") {
        throw new ValidateError(
          sliceStringAtCharFirstPosition(error.message, ":"),
        );
      }
      throw error;
    }

    return data;
  }

  static async updateImageCategory(id, image_url) {
    const { data, error } = await supabase
      .from("categories")
      .update({ image_url })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // no row found
      if (error.code === "PGRST116") {
        throw new NotFoundError("Post not found");
      } else if (error.code === "22P02") {
        throw new ValidateError(
          sliceStringAtCharFirstPosition(error.message, ":"),
        );
      }
      throw error;
    }
    return data;
  }
}

module.exports = Category;
