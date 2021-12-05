const { v4: uuidv4 } = require("uuid");
import path from "path";
import { existsSync, readFileSync } from "fs";

const pathToUserData = path.join(__dirname, "../../users.json");

const users = JSON.parse(readFileSync(pathToUserData, "utf-8")) || [];

const { writeDataToFile } = require("../utils");

function create(user: object[]) {
  console.log("user", user);
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile(pathToUserData, users);
    resolve(newUser);
  });
}
// function findOne(id: string) {
//   return new Promise((resolve, reject) => {
//     const user = users.find((user) => user.id === id);
//     resolve(user);
//   });
// }
module.exports = {
  create,
};
