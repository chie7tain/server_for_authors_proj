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
exports.aliasYoungAuthors = exports.updateAuthor = exports.deleteAuthor = exports.getAllAuthors = exports.getAuthor = exports.createAuthor = exports.createAuthorForm = void 0;
// const Author = require("../models/authorModel");
const Author = require("../models/authorModel");
const validate_1 = require("../validation/validate");
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    // filter function
    filter() {
        const queryObj = Object.assign({}, this.queryString);
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);
        // 1b). Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    // sort function
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    // limit function
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    // pagination function
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
// read data
// CONTROLLERS
const aliasYoungAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.query.limit = "5";
        req.query.sort = "createdAt,age";
        req.query.fields = "age,address,author";
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.aliasYoungAuthors = aliasYoungAuthors;
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXECUTE THE QUERY
        const features = new APIFeatures(Author.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const authors = yield features.query;
        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            data: authors,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.getAllAuthors = getAllAuthors;
const createAuthorForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("createauthor");
});
exports.createAuthorForm = createAuthorForm;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = (0, validate_1.validateAuthorDetails)(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        }
        else {
            console.log(value);
            const newAuthor = yield Author.create(value);
            res.status(201).json({
                status: "success",
                data: {
                    author: newAuthor,
                },
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: "fail", message: err });
    }
});
exports.createAuthor = createAuthor;
const getAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield Author.findById(req.params.id);
        res.status(200).json({
            message: "author found",
            data: author,
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ status: "fail", message: err });
    }
});
exports.getAuthor = getAuthor;
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const updatedAuthor = yield Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                updatedAuthor,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Author.findByIdAndDelete(req.params.id);
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
