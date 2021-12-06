export {};
import {
  writeFile,
  writeFileSync,
  appendFileSync,
  existsSync,
  appendFile,
} from "fs";

import { Request, Response } from "express";
import { defaults } from "joi";
const path = require("path");

function writeDataToFile(filepath: string, content: string) {
  try {
    if (existsSync(filepath)) {
      writeFileSync(filepath, JSON.stringify(content, null, 2));
    } else {
      appendFile(filepath, content, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`${filepath} file created writen to`);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
function getPostData(req: Request) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = {
  writeDataToFile,
  getPostData,
};
