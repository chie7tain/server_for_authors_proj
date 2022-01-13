"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
// READ JSON FILE
const authors = JSON.parse(fs.readFileSync(`${__dirname}/MOCK_DATA_Authors.json`, "utf-8"));
const books = JSON.parse(fs.readFileSync(`${__dirname}/MOCK_DATA_Books.json`, "utf-8"));
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Author.create(authors);
        yield Book.create(books);
        console.log("Data successfully loaded");
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
});
// DELETE ALL DATA FROM Dbase
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Author.deleteMany();
        yield Book.deleteMany();
        console.log("data deleted successfully");
        process.exit();
    }
    catch (error) {
        console.log(error);
    }
});
if (process.argv[2] === "--import") {
    importData();
}
else if (process.argv[2] === "--delete") {
    deleteData();
}
console.log(process.argv);
