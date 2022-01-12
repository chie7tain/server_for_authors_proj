
import { Request, Response } from "express";

const Author = require("../models/authorModels");

// read data
// CONTROLLERS
const getAllAuthors = async (req: Request, res: Response) => {
  try {
    // const authors = await Author.findAll();
    // res.render("index", { title: "Authors", authors: authors });
  } catch (error) {
    console.log(error);
  }
};

export const createAuthorForm = async (req: Request, res: Response) => {
  res.render("createauthor");
};

const createAuthor = async (req: Request, res: Response) => {};

const getAuthor = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;

    // let author = await Author.findById(id);
    // if (!author) {
    //   res.render("404", { title: "author not found" });
    // } else {
    //   res.render("aboutauthor", { title: "Author", author: author });
    //   res.status(200).json({
    //     status: "success",
    //     data: author,
    //   });
    // }
  } catch (err) {
    console.log(err);
  }
};

const updateAuthor = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    // let id = +req.params.id;
    // // let author = authors.find((author: { id: string }) => author.id == id);
    // let author = await Author.findById(id);
    // console.log("from update", author);
    // if (!author) {
    //   res.status(404).json({
    //     status: "fail",
    //     message: "author not found",
    //   });
    // } else {
    //   let {
    //     author: authorName,
    //     dateRegistered,
    //     age,
    //     address,
    //     books,
    //   } = req.body;
    //   const authorData = {
    //     authorName: authorName || author.authorName,
    //     dateRegistered: dateRegistered || author.dateRegistered,
    //     age: age || author.age,
    //     ddress: address || author.address,
    //     books: books || author.books,
    //   };
    //   const updatedAuthor = await Author.update(id, authorData);
    //   res.status(200).json({
    //     status: "success",
    //     data: updatedAuthor,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

const deleteAuthor = async (req: Request, res: Response) => {
  try {
    let id = +req.params.id;

    res.status(200).json({
      status: `successfully deleted`,
      message: null,
    });
  } catch (error) {
    console.log(error);
  }
};
export { createAuthor, getAuthor, getAllAuthors, deleteAuthor, updateAuthor };
