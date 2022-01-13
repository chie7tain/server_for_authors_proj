"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBook = exports.validateAuthorDetails = exports.validateAuthor = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUser = (user) => {
    const userSchema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().min(6).max(255).required().email(),
        password: joi_1.default.string().min(6).max(255).required(),
        confirmPassword: joi_1.default.string().min(6).max(255).required(),
        dateOfBirth: joi_1.default.date().required(),
    });
    return userSchema.validate(user);
};
exports.validateUser = validateUser;
const validateAuthor = (author) => {
    const authorSchema = joi_1.default.object({
        author: joi_1.default.string().min(3).max(50).required(),
        dateRegistered: joi_1.default.date().timestamp(),
        age: joi_1.default.number().min(1).max(180).required(),
        address: joi_1.default.string().required().error(new Error("Address required")),
        books: joi_1.default.array().items(joi_1.default.object({
            id: joi_1.default.string()
                .alphanum()
                .required()
                .regex(/^[0-9a-fA-F]{24}$/),
            name: joi_1.default.string().min(3).max(50).required(),
            isPublished: joi_1.default.boolean().required(),
            datePublished: joi_1.default.date().required(),
            serialNumber: joi_1.default.string().alphanum().required(),
        })),
    });
    return authorSchema.validate(author);
};
exports.validateAuthor = validateAuthor;
function validateAuthorDetails(author) {
    const authorSchema = joi_1.default.object({
        author: joi_1.default.string().min(3).max(50).required(),
        dateRegistered: joi_1.default.date(),
        age: joi_1.default.number().min(1).max(180).required(),
        address: joi_1.default.string().required().error(new Error("Address required")),
        books: joi_1.default.array()
    });
    return authorSchema.validate(author);
}
exports.validateAuthorDetails = validateAuthorDetails;
function validateBook(book) {
    const bookSchema = joi_1.default.object({
        author: joi_1.default.string().max(50).required(),
        publisher: joi_1.default.string().max(50),
        description: joi_1.default.string().max(255),
        genre: joi_1.default.string().max(50),
        pages: joi_1.default.number().min(1).max(10000),
        title: joi_1.default.string().min(3).max(50).required(),
        isPublished: joi_1.default.boolean().required(),
        datePublished: joi_1.default.date().required(),
        serialNumber: joi_1.default.string().alphanum(),
    });
    return bookSchema.validate(book);
}
exports.validateBook = validateBook;
