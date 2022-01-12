"use strict";
const express = require("express");
const bookRouter = express.Router();
const Book = require("../controllers/bookController");
bookRouter.route("/").get(Book.getAllBooks).post(Book.createBook);
bookRouter
    .route("/:id")
    .get(Book.getBook)
    .patch(Book.updateBook)
    .delete(Book.deleteBook);
module.exports = bookRouter;
