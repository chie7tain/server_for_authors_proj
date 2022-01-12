"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const pathToUserData = path_1.default.join(__dirname, "../../users.json");
let users = JSON.parse((0, fs_1.readFileSync)(pathToUserData, "utf-8")) || [];
const { writeDataToFile } = require("../utils");
function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = Object.assign({ id: uuidv4() }, user);
        users.push(newUser);
        writeDataToFile(pathToUserData, users);
        resolve(newUser);
    });
}
function findByEmail(email) {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.email === email);
        resolve(user);
    });
}
function remove(id) {
    return new Promise((resolve, reject) => {
        users = users.filter((user) => user.id !== id);
        writeDataToFile(pathToUserData, users);
        resolve("user deleted");
    });
}
function findById(id) {
    return new Promise((resolve, reject) => {
        let user = users.find((user) => user.id === id);
        resolve(user);
    });
}
module.exports = {
    create,
    findByEmail,
    remove,
    findById,
};
