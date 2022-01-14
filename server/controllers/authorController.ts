import { Request, Response } from "express";

// const Author = require("../models/authorModel");
const Author = require("../models/authorModel");
import { validateAuthor, validateAuthorDetails } from "../validation/validate";

// read data
// CONTROLLERS
const getAllAuthors = async (req: Request, res: Response) => {
  try {
    // BUILD QUERY
    // 1a). Filtering

    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 1b). Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Author.find(JSON.parse(queryStr));

    // 2). Sorting

    if (req.query.sort) {
      req.query.sort = String(req.query.sort);
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("--createdAt");
    }

    // 3). Field Limiting
    if (req.query.fields) {
      req.query.fields = String(req.query.fields);
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4). Pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 100;
    const skip = (page - 1) * limit;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // const total = await Author.countDocuments();

    query = query.skip(skip).limit(5);
    if (req.query.page) {
      const numAuthors = await Author.countDocuments();
      if (skip >= numAuthors) {
        throw new Error("This page does not exist");
      }
    }

    // EXECUTE THE QUERY
    const authors = await query;

    // SEND RESPONSE
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
    console.log(req.params.id);
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
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: `successfully deleted`,
      message: null,
    });
  } catch (error) {
    console.log(error);
  }
};
export { createAuthor, getAuthor, getAllAuthors, deleteAuthor, updateAuthor };
