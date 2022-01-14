import createError from "http-errors";
import path from "path";

import cookieParser from "cookie-parser";
import logger from "morgan";
const viewrouter = require("./routes/views");
const authorRouter = require("./routes/authorRoutes");
const bookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurantRoutes");

import express from "express";
const app = express();
import { Request, Response, NextFunction } from "express";

app.use(express.static("public"));
app.set("view engine", "ejs");
// set views folder
app.set("views", path.join(__dirname, "../views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/api/v1", viewrouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/restaurants", restaurantRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(
  (
    err: { message: any; status: any },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("404", { title: "500" });
  }
);

module.exports = app;
