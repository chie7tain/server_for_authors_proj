export {};
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // link to authorSchema
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  book_name: {
    type: String,
    required: [true, "Title is required"],
  },
  author_name: {
    type: String,
    required: [true, "Author is required"],
  },
  published_status: Boolean,
  date_published: Date,
  serial_number: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
