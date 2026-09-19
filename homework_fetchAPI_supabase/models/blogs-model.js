const supabase = require("../libs/supabase-client");

const {
  convertPageAndPageSize,
  sliceStringAtCharFirstPosition,
} = require("../helpers/utils");
const { NotFoundError, ValidateError } = require("../helpers/errors");

class Blogs {
  constructor({
    title,
    slug,
    content,
    excerpt,
    category_id,
    status = "draft",
    published_at = "",
  }) {
    this.title = title;
    this.slug = slug;
    this.content = content;
    this.excerpt = excerpt;
    this.status = status;
    this.category_id = category_id;
    this.published_at = published_at;
  }

  static async getBlogsAsync(page, pageSize) {
    const { from, to } = convertPageAndPageSize(page, pageSize);
    const { data, error, count } = await supabase
      .from("categories")
      .select("*", { count: "exact" })
      .range(from, to);
    if (error) {
      throw error;
    }
    console.log(data);
    return { data, count };
  }

  static async getBlogById(id) {
    const { data, error } = await supabase
      .from("posts")
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

  async save() {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: this.title,
        slug: this.slug,
        content: this.content,
        excerpt: this.excerpt,
        category_id: this.category_id,
        status: this.status,
        published_at: this.published_at,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}

module.exports = Blogs;
