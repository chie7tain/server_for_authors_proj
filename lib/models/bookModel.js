"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    // link to authorSchema
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    publisher: {
        type: String,
    },
    pages: {
        type: Number,
        required: [true, "Pages is required"],
    },
    coverImage: {
        type: String,
    },
    isPublished: Boolean,
    datePublished: Date,
    serialNumber: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
