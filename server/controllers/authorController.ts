import { NextFunction, Request, Response } from "express";

// const Author = require("../models/authorModel");
const Author = require("../models/authorModel");
import { validateAuthor, validateAuthorDetails } from "../validation/validate";

class APIFeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }
  // filter function
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1b). Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  // sort function
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  // limit function
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  // pagination function
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
// read data
// CONTROLLERS
const aliasYoungAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.query.limit = "5";
    req.query.sort = "createdAt,age";
    req.query.fields = "age,address,author";
    next();
  } catch (error) {
    console.log(error);
  }
};
const getAllAuthors = async (req: Request, res: Response) => {
  try {

    // EXECUTE THE QUERY
    const features = new APIFeatures(Author.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const authors = await features.query;

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
export {
  createAuthor,
  getAuthor,
  getAllAuthors,
  deleteAuthor,
  updateAuthor,
  aliasYoungAuthors,
};
