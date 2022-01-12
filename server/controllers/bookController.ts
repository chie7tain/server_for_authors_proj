const Book = require("../models/bookModel");
import { validateBook } from "../validation/validate";
import { Request, Response } from "express";

const createBook = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateBook(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      const newBook = await Book.create(value);
      res.status(201).json({
        status: "sucess",
        data: {
          book: newBook,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
  res.send("createBook");
};
const getAllBooks = async (req: Request, res: Response) => {
  res.send("getAllbooks");
};
const getBook = async (req: Request, res: Response) => {
  res.send("get book");
};
const updateBook = async (req: Request, res: Response) => {
  res.send("update book");
};
const deleteBook = async (req: Request, res: Response) => {
  res.send("delete book");
};
module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
