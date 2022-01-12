import { Request, Response } from "express";

const Author = require("../models/authorModel");
import { validateAuthor, validateAuthorDetails } from "../validation/validate";

// read data
// CONTROLLERS
const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.status(200).json({
      status: "success",
      data: authors,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};

export const createAuthorForm = async (req: Request, res: Response) => {
  res.render("createauthor");
};

const createAuthor = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateAuthorDetails(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      console.log(value);
      const newAuthor = await Author.create(value);

      res.status(201).json({
        status: "success",
        data: {
          author: newAuthor,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
};

const getAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    res.status(200).json({
      message: "author found",
      data: author,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "fail", message: err });
  }
};

const updateAuthor = async (req: Request, res: Response) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedAuthor,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};

const deleteAuthor = async (req: Request, res: Response) => {
  try {
    await Author.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: `successfully deleted`,
      message: null,
    });
  } catch (error) {
    console.log(error);
  }
};
export { createAuthor, getAuthor, getAllAuthors, deleteAuthor, updateAuthor };
