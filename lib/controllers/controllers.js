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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.getData = exports.createData = exports.getAllData = exports.createAuthorForm = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathToData = path_1.default.join(__dirname, "../../database.json");
let authors = JSON.parse(fs_1.default.readFileSync(pathToData, {
    encoding: "utf-8",
}));
const Author = require("../models/authorModels");
// read data
// CONTROLLERS
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield Author.findAll();
        res.render("index", { title: "Authors", authors: authors });
        // res.status(200).json({
        //   status: "success",
        //   data: { amt: authors.length, authors },
        // });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllData = getAllData;
const createAuthorForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("createauthor");
});
exports.createAuthorForm = createAuthorForm;
const createData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let newAuthor = yield Author.create(req.body);
    res.status(201).json({
        status: "success",
        data: newAuthor,
    });
});
exports.createData = createData;
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        let author = yield Author.findById(id);
        if (!author) {
            res.render("404", { title: "author not found" });
        }
        else {
            res.render("aboutauthor", { title: "Author", author: author });
            res.status(200).json({
                status: "success",
                data: author,
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.getData = getData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let id = +req.params.id;
        // let author = authors.find((author: { id: string }) => author.id == id);
        let author = yield Author.findById(id);
        console.log("from update", author);
        if (!author) {
            res.status(404).json({
                status: "fail",
                message: "author not found",
            });
        }
        else {
            let { author: authorName, dateRegistered, age, address, books, } = req.body;
            const authorData = {
                authorName: authorName || author.authorName,
                dateRegistered: dateRegistered || author.dateRegistered,
                age: age || author.age,
                ddress: address || author.address,
                books: books || author.books,
            };
            const updatedAuthor = yield Author.update(id, authorData);
            res.status(200).json({
                status: "success",
                data: updatedAuthor,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateData = updateData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = +req.params.id;
        let author = yield authors.find((author) => author.id === id);
        if (!author) {
            res.status(404).json({
                status: "fail",
                message: "author not found",
            });
        }
        else {
            yield Author.remove(id);
            res.status(200).json({
                status: `successfully deleted`,
                message: null,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteData = deleteData;
