"use strict";
const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
    author: {
        type: String,
        unique: true,
        required: [true, "an Author should have a name or pseudoname"],
    },
    age: Number,
    address: String,
}, { timeStamps: { createdAt: "created_at" } });
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
