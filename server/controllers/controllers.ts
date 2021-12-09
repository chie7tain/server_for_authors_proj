import fs from "fs";
import path from "path";
import { Request, Response } from "express";
const pathToData = path.join(__dirname, "../../database.json");
let authors = JSON.parse(
  fs.readFileSync(pathToData, {
    encoding: "utf-8",
  })
);
const Author = require("../models/authorModels");

// read data
// CONTROLLERS
const getAllData = async (req: Request, res: Response) => {
  try {
    const authors = await Author.findAll();
    res.render("index", { title: "Authors", authors: authors });
    res.status(200).json({
      status: "success",
      data: { amt: authors.length, authors },
    });
  } catch (error) {
    console.log(error);
  }
};

const createData = async (req: Request, res: Response) => {
  let newAuthor = await Author.create(req.body);
  res.status(201).json({
    status: "success",
    data: newAuthor,
  });
};

const getData = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    let author = await Author.findById(id);
    res.status(200).json({
      status: "success",
      data: author,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateData = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    let id = +req.params.id;
    // let author = authors.find((author: { id: string }) => author.id == id);
    let author = await Author.findById(id);
    console.log("from update", author);

    if (!author) {
      res.status(404).json({
        status: "fail",
        message: "author not found",
      });
    } else {
      let {
        author: authorName,
        dateRegistered,
        age,
        address,
        books,
      } = req.body;

      const authorData = {
        authorName: authorName || author.authorName,
        dateRegistered: dateRegistered || author.dateRegistered,
        age: age || author.age,
        ddress: address || author.address,
        books: books || author.books,
      };

      const updatedAuthor = await Author.update(id, authorData);
      res.status(200).json({
        status: "success",
        data: updatedAuthor,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req: Request, res: Response) => {
  try {
    let id = +req.params.id;

    let author = await authors.find((author: any) => author.id === id);

    if (!author) {
      res.status(404).json({
        status: "fail",
        message: "author not found",
      });
    } else {
      await Author.remove(id);
      res.status(200).json({
        status: `successfully deleted`,
        message: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export { getAllData, createData, getData, updateData, deleteData };
