"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const authors = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(__dirname, "../../database.json")).toString());
const displayAllAuthors = (req, res) => {
    console.log(authors);
    res.render("authors", { title: "author view", authors: authors });
};
router.route("/").get(displayAllAuthors);
