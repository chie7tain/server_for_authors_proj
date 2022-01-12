"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bookSchema = new mongoose.schema({
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
        required: [true, "Publisher is required"],
    },
    pages: {
        type: Number,
        required: [true, "Pages is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
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
