export {};
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const fs = require("fs");
const path = require("path");
const Author = require("./models/authorModel");
const Book = require("./models/bookModel");

const localDB = process.env.DATABASE_LOCAL;
mongoose
  .connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
// READ JSON FILE
const authors = JSON.parse(
  fs.readFileSync(`${__dirname}/MOCK_DATA_Authors.json`, "utf-8")
);
const books = JSON.parse(
  fs.readFileSync(`${__dirname}/MOCK_DATA_Books.json`, "utf-8")
);

const importData = async () => {
  try {
    await Author.create(authors);
    await Book.create(books);
    console.log("Data successfully loaded");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

// DELETE ALL DATA FROM Dbase

const deleteData = async () => {
  try {
    await Author.deleteMany();
    await Book.deleteMany();
    console.log("data deleted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
