"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathToData = path_1.default.join(__dirname, "../../database.json");
let authors = JSON.parse(fs_1.default.readFileSync(pathToData, { encoding: "utf-8" }));
const { writeDataToFile, getPostData } = require("../utils");
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(authors);
    });
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const author = authors.find((author) => author.id === id);
        resolve(author);
        if (!author) {
            reject(new Error("author not found"));
        }
        else {
            resolve(author);
        }
    });
}
function create(author) {
    return new Promise((resolve, reject) => {
        const id = authors[authors.length - 1].id + 1;
        const newProduct = Object.assign({ id }, author);
        authors.push(newProduct);
        writeDataToFile(pathToData, authors);
        resolve(newProduct);
    });
}
function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = authors.findIndex((author) => author.id === id);
        console.log(index);
        authors[index] = Object.assign({ id }, product);
        writeDataToFile(pathToData, authors);
        resolve(authors[index]);
    });
}
function remove(id) {
    return new Promise((resolve, reject) => {
        authors = authors.filter((author) => author.id !== id);
        writeDataToFile(pathToData, authors);
        resolve("product deleted");
    });
}
module.exports = { findAll, findById, create, update, remove };
