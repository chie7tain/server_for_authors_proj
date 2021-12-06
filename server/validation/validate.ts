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
    name: Joi.string().min(3).max(50).required(),
    dateRegistered: Joi.date().required(),
    age: Joi.number().min(1).max(180).required(),
    address: Joi.string().required().error(new Error("Address required")),
    books: Joi.array().items(
      Joi.object({
        id: Joi.string()
          .alphanum()
          .required()
          .regex(/^[0-9a-fA-F]{24}$/),
        name: Joi.string().min(3).max(50).required(),
        isPublished: Joi.boolean().required(),
        datePublished: Joi.date().required(),
        serialNumber: Joi.string().alphanum().required(),
      })
    ),
  });
  return authorSchema.validate(author);
};
export function validateAuthorDetails(author: Record<string, any>) {
  const authorSchema: Schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    dateRegistered: Joi.date().required(),
    age: Joi.number().min(1).max(180).required(),
    address: Joi.string().required().error(new Error("Address required")),
  });
  return authorSchema.validate(author);
}
export function validateAuthorBook(book: Record<string, any>) {
  const bookSchema: Schema = Joi.object({
    id: Joi.string()
      .alphanum()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().min(3).max(50).required(),
    isPublished: Joi.boolean().required(),
    datePublished: Joi.date().required(),
    serialNumber: Joi.string().alphanum().required(),
  });
  return bookSchema.validate(book);
}
