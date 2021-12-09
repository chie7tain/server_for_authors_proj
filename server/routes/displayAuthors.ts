import express, { Response, Request, NextFunction } from "express";
const router = express.Router();
import path from "path";
import { readFileSync } from "fs";
const authors = JSON.parse(
  readFileSync(path.join(__dirname, "../../database.json")).toString()
);

const displayAllAuthors = (req: Request, res: Response) => {
  console.log(authors);
  res.render("authors", { title: "author view", authors: authors });
};

router.route("/").get(displayAllAuthors);
