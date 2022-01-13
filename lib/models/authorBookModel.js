"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=authorBookModel.js.map
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    // link to authorSchema
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Author",
    // },
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
const authorSchema = new mongoose.Schema({
    author: {
        type: String,
        unique: true,
        required: [true, "an Author should have a name or pseudoname"],
    },
    age: Number,
    address: String,
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Book = mongoose.model("Book", bookSchema);
const Author = mongoose.model("Author", authorSchema);
