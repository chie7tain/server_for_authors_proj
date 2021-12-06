import expres, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/userModel");
const { validateUser } = require("../validation/validate");

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = validateUser(req.body);
    if (error) {
      res.status(400).json({
        status: "fail",
        message: `${error.details[0].message}`,
      });
    } else {
      let userExists = await User.findByEmail(req.body.email);
      if (!userExists) {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            if (req.body.password !== req.body.confirmPassword) {
              res.status(409).json({
                message: "password must match",
              });
            } else {
              req.body.password = hash;
              req.body.confirmPassword = hash;
              await User.create(req.body);
              res.status(201).json({
                status: "success",
                data: "user created",
              });
            }
          }
        });
      } else {
        res.status(409).json({
          status: "user exists",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await User.findByEmail(req.body.email);

    if (!user) {
      res.status(401).json({
        status: "Auth failed",
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            "secretKey",
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successfull",
            token: token,
          });
        } else {
          res.status(401).json({
            message: "Auth failed",
          });
        }
      });
    }
  } catch (error) {}
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        status: "user not found",
      });
    } else {
      await User.remove(id);
      res.status(200).json({
        status: "user deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export { createUser, removeUser, loginUser };
