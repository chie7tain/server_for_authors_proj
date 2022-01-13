"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    // link to authorSchema
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    },
    name: {
        type: String,
        required: [true, "Title is required"],
    },
    isPublished: Boolean,
    datePublished: Date,
    serialNumber: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
