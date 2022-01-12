import fs from "fs";
import path from "path";
const pathToData = path.join(__dirname, "../../database.json");
let authors = JSON.parse(fs.readFileSync(pathToData, { encoding: "utf-8" }));
const { writeDataToFile, getPostData } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(authors);
  });
}
function findById(id: number) {
  return new Promise((resolve, reject) => {
    const author = authors.find((author: { id: number }) => author.id === id);
    resolve(author);
    if (!author) {
      reject(new Error("author not found"));
    } else {
      resolve(author);
    }
  });
}
function create(author: object[]) {
  return new Promise((resolve, reject) => {
    const id = authors[authors.length - 1].id + 1;
    const newProduct = { id, ...author };
    authors.push(newProduct);
    writeDataToFile(pathToData, authors);
    resolve(newProduct);
  });
}
function update(id: string | number, product: any) {
  return new Promise((resolve, reject) => {
    const index = authors.findIndex(
      (author: { id: string | number }) => author.id === id
    );
    console.log(index);
    authors[index] = { id, ...product };
    writeDataToFile(pathToData, authors);
    resolve(authors[index]);
  });
}
function remove(id: string | number) {
  return new Promise((resolve, reject) => {
    authors = authors.filter(
      (author: { id: string | number }) => author.id !== id
    );
    writeDataToFile(pathToData, authors);
    resolve("product deleted");
  });
}
module.exports = { findAll, findById, create, update, remove };
