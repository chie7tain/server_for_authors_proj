import express, { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

interface reqObj extends Request {
  userData: any;
}

export function checkAuth(
  req: reqObj,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
    };
  },
  next: () => void
) {
  try {
    console.log("in auth middleware");
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.token;

    const decoded = jwt.verify(token, "secret_key");
    console.log(decoded);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
}
