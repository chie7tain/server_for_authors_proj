import Joi, { Schema } from "joi";

export const validateUser = (user: Record<string, any>) => {
  const userSchema: Schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string().min(6).max(255).required(),
    dateOfBirth: Joi.date().required(),
  });
  return userSchema.validate(user);
};
export const validateAuthor = (author: Record<string, any>) => {
  const authorSchema: Schema = Joi.object({
    author_name: Joi.string().min(3).max(50).required(),
    age: Joi.number().min(1).max(180).required(),
    address: Joi.string().required().error(new Error("Address required")),
    // books: Joi.array().items(
    //   Joi.object({
    //     id: Joi.string()
    //       .alphanum()
    //       .required()
    //       .regex(/^[0-9a-fA-F]{24}$/),
    //     name: Joi.string().min(3).max(50).required(),
    //     isPublished: Joi.boolean().required(),
    //     datePublished: Joi.date().required(),
    //     serialNumber: Joi.string().alphanum().required(),
    //   })
    // ),
  });
  return authorSchema.validate(author);
};
export function validateAuthorDetails(author: Record<string, any>) {
  const authorSchema: Schema = Joi.object({
    author_name: Joi.string().min(3).max(50).required(),
    // dateRegistered: Joi.date(),
    age: Joi.number().min(1).max(180).required(),
    address: Joi.string().required().error(new Error("Address required")),
    books:Joi.array()
  });
  return authorSchema.validate(author);
}

export function validateBook(book: Record<string, any>) {
  const bookSchema: Schema = Joi.object({
    author_name: Joi.string().max(50).required(),
    // publisher: Joi.string().max(50),
    // description: Joi.string().max(255),
    // genre: Joi.string().max(50),
    // pages: Joi.number().min(1).max(10000),
    book_name: Joi.string().min(3).max(50).required(),
    published_status: Joi.boolean().required(),
    date_published: Joi.date().required(),
    serial_number: Joi.string().alphanum(),
    author_id:Joi.string().alphanum(),
  });
  return bookSchema.validate(book);
}
