"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const spies = [];
// , { title: "spy view", spies }
const displayAllSpies = (req, res) => {
    res.render("spy", { title: "spy view", spies });
};
const createSpy = (req, res) => {
    const spy = req.body;
    spies.push(spy);
    res.status(201).json({
        status: "success",
        data: { spy },
    });
};
router.route("/").get(displayAllSpies).post(createSpy);
module.exports = router;
