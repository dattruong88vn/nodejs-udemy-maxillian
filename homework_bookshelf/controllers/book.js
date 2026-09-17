const Book = require("../models/book.js");
const { NotFoundError, ValidationError } = require("../helpers/errors.js");
const { BOOK_STATUS } = require("../helpers/constants.js");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.getBooksAsync();
    res.json(books);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

exports.getBookById = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const book = await Book.getBookByIdAsync(bookId);
    if (!book) {
      throw new NotFoundError("Book not found");
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      throw new ValidationError("Title and author are required");
    }

    const newBook = new Book(title, author, BOOK_STATUS.WISHLIST);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;
    const updatedBook = await Book.updateBookAsync(bookId, updatedData);
    if (!updatedBook) {
      throw new NotFoundError("Book not found");
    }
    res.json(updatedBook);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const status = await Book.deleteBookAsync(bookId);
    if (!status) {
      throw new NotFoundError("Book not found");
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
