const fs = require("fs");
const { getBooksPath } = require("../helpers/path.js");
const { BOOK_STATUS } = require("../helpers/constants.js");

class Book {
  constructor(title, author, status = BOOK_STATUS.WISHLIST) {
    this.id = Date.now().toString(); // Example: using timestamp as ID
    this.title = title;
    this.author = author;
    this.status = status;
  }

  static async getBooksAsync() {
    try {
      const filePath = getBooksPath();
      const data = await fs.promises.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading books.json:", err);
      throw err; // Rethrow the error to be handled by the caller
    }
  }

  static async getBookByIdAsync(id) {
    const books = await Book.getBooksAsync();
    return books.find((b) => b.id === id);
  }

  static async updateBookAsync(id, updatedData) {
    const books = await Book.getBooksAsync();
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return false; // Book not found
    }

    // Update the book with the new data
    books[bookIndex] = { ...books[bookIndex], ...updatedData };

    const filePath = getBooksPath();
    await fs.promises.writeFile(filePath, JSON.stringify(books, null, 2));
    return books[bookIndex]; // Return the updated book
  }

  static async deleteBookAsync(id) {
    const books = await Book.getBooksAsync();
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return false;
    }

    books.splice(bookIndex, 1); // Remove the book from the array

    const filePath = getBooksPath();
    await fs.promises.writeFile(filePath, JSON.stringify(books, null, 2));
    return true;
  }

  async save() {
    const books = await Book.getBooksAsync();
    const filePath = getBooksPath();
    books.push(this); // add new book to the list
    await fs.promises.writeFile(filePath, JSON.stringify(books, null, 2));
    return this;
  }
}

module.exports = Book;
