import { Request, Response, NextFunction } from "express";

const express = require("express");
const router = express.Router();

const spies: object[] = [];
// , { title: "spy view", spies }

const displayAllSpies = (req: any, res: any) => {
  res.render("spy", { title: "spy view", spies });
};

const createSpy = (req: any, res: any) => {
  const spy = req.body;
  spies.push(spy);
  res.status(201).json({
    status: "success",
    data: { spy },
  });
};

router.route("/").get(displayAllSpies).post(createSpy);

module.exports = router;
