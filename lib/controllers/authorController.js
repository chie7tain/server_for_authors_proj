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
exports.updateAuthor = exports.deleteAuthor = exports.getAllAuthors = exports.getAuthor = exports.createAuthor = exports.createAuthorForm = void 0;
const Author = require("../models/authorModels");
// read data
// CONTROLLERS
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authors = await Author.findAll();
        // res.render("index", { title: "Authors", authors: authors });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllAuthors = getAllAuthors;
const createAuthorForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("createauthor");
});
exports.createAuthorForm = createAuthorForm;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createAuthor = createAuthor;
const getAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        // let author = await Author.findById(id);
        // if (!author) {
        //   res.render("404", { title: "author not found" });
        // } else {
        //   res.render("aboutauthor", { title: "Author", author: author });
        //   res.status(200).json({
        //     status: "success",
        //     data: author,
        //   });
        // }
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAuthor = getAuthor;
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        // let id = +req.params.id;
        // // let author = authors.find((author: { id: string }) => author.id == id);
        // let author = await Author.findById(id);
        // console.log("from update", author);
        // if (!author) {
        //   res.status(404).json({
        //     status: "fail",
        //     message: "author not found",
        //   });
        // } else {
        //   let {
        //     author: authorName,
        //     dateRegistered,
        //     age,
        //     address,
        //     books,
        //   } = req.body;
        //   const authorData = {
        //     authorName: authorName || author.authorName,
        //     dateRegistered: dateRegistered || author.dateRegistered,
        //     age: age || author.age,
        //     ddress: address || author.address,
        //     books: books || author.books,
        //   };
        //   const updatedAuthor = await Author.update(id, authorData);
        //   res.status(200).json({
        //     status: "success",
        //     data: updatedAuthor,
        //   });
        // }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = +req.params.id;
        res.status(200).json({
            status: `successfully deleted`,
            message: null,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAuthor = deleteAuthor;
