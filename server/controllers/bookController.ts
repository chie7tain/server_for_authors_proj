const Book = require("../models/bookModel");
import { Request, Response, Response } from "express";

const createBook = async (req: Request, res: Response) => {
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
