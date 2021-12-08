import express, { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

function checkAuth(
  req: {
    headers: { authorization: string };
    body: { token: any };
    userData: any;
  },
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
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secretKey");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
}

export { checkAuth };
