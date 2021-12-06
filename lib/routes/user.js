"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createUser, removeUser, loginUser, } = require("../controllers/userControllers");
const User = require("../models/userModel");
const router = express_1.default.Router();
router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").delete(removeUser);
module.exports = router;
