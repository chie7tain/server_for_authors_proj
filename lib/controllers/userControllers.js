"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.removeUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { validateUser } = require("../validation/validate");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we use the joi package to validate the user input
        const { error, value } = validateUser(req.body);
        if (error) {
            res.status(400).json({
                status: "fail",
                message: `${error.details[0].message}`,
            });
        }
        else {
            let userExists = yield User.findByEmail(req.body.email);
            if (!userExists) {
                bcryptjs_1.default.hash(req.body.password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    }
                    else {
                        if (req.body.password !== req.body.confirmPassword) {
                            res.status(409).json({
                                message: "password must match",
                            });
                        }
                        else {
                            req.body.password = hash;
                            req.body.confirmPassword = hash;
                            yield User.create(req.body);
                            res.status(201).json({
                                status: "success",
                                data: "user created",
                            });
                        }
                    }
                }));
            }
            else {
                res.status(409).json({
                    status: "user exists",
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User.findByEmail(req.body.email);
        if (!user) {
            res.status(401).json({
                status: "Auth failed",
            });
        }
        else {
            bcryptjs_1.default.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
                if (result) {
                    console.log(process.env.JWT_KEY, "jwt from env");
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                    }, "secretKey", {
                        expiresIn: "1h",
                    });
                    res.cookie("token", token);
                    res.redirect("/api/v1/authors");
                    // return res.status(200).json({
                    //   message: "Auth successfull",
                    //   token: token,
                    // });
                }
                else {
                    res.status(401).json({
                        message: "Auth failed",
                    });
                }
            });
        }
    }
    catch (error) { }
});
exports.loginUser = loginUser;
const removeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User.findById(id);
        if (!user) {
            res.status(404).json({
                status: "user not found",
            });
        }
        else {
            yield User.remove(id);
            res.status(200).json({
                status: "user deleted",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.removeUser = removeUser;
