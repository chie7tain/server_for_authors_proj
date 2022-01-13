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
// const Book = require("../models/bookModel");
const Book = require("../models/bookModel");
const validate_1 = require("../validation/validate");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = (0, validate_1.validateBook)(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        }
        else {
            const newBook = yield Book.create(value);
            res.status(201).json({
                status: "sucess",
                data: {
                    book: newBook,
                },
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
    res.send("createBook");
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book.find();
        res.status(200).json({
            status: "success",
            data: books,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: "fail", message: err });
    }
});
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book.findById(req.params.id);
        res.status(200).json({ status: "success", data: book });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: "fail", message: err });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                book,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: "fail", message: err });
    }
    res.send("update book");
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("delete book");
});
module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
