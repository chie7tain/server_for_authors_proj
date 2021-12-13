const { v4: uuidv4 } = require("uuid");
import path from "path";
import { existsSync, readFileSync } from "fs";

const pathToUserData = path.join(__dirname, "../../users.json");

let users = JSON.parse(readFileSync(pathToUserData, "utf-8")) || [];

const { writeDataToFile } = require("../utils");

function create(user: object[]) {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile(pathToUserData, users);
    resolve(newUser);
  });
}
function findByEmail(email: string) {
  return new Promise((resolve, reject) => {
    const user = users.find((user: { email: string }) => user.email === email);
    resolve(user);
  });
}
function remove(id: string) {
  return new Promise((resolve, reject) => {
    users = users.filter((user: { id: string }) => user.id !== id);
    writeDataToFile(pathToUserData, users);
    resolve("user deleted");
  });
}
function findById(id: string) {
  return new Promise((resolve, reject) => {
    let user = users.find((user: { id: string }) => user.id === id);
    resolve(user);
  });
}
module.exports = {
  create,
  findByEmail,
  remove,
  findById,
};
