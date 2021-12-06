import express, { Request, Response, NextFunction } from "express";
const {
  createUser,
  removeUser,
  loginUser,
} = require("../controllers/userControllers");
const User = require("../models/userModel");

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").delete(removeUser);

module.exports = router;
