"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
