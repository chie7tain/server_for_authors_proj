import express, { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

interface reqObj extends Request {
  userData: any;
}

function checkAuth(
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
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
}

export { checkAuth };
