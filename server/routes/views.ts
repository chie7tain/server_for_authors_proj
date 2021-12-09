var express = require("express");
var router = express.Router();
import { Response, Request, NextFunction, response } from "express";
// function renderView(
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   view: string,
//   data: any
// ) {
//   res.render(view, {
//     title: data.title,
//   });
// }

/* GET home page. */
router
  .route("/")
  .get(function (
    req: Request,
    res: { render: (arg0: string, arg1: { title: string }) => void },
    next: NextFunction
  ) {
    res.render("index", { title: "home" });
  });
router
  .route("/aboutauthor")
  .get(function (
    req: Request,
    res: { render: (arg0: string, arg1: { title: string }) => void },
    next: NextFunction
  ) {
    res.render("aboutauthor", { title: "about author" });
  });

router.use(function (
  req: Request,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      render: { (arg0: string, arg1: { title: string }): void; new (): any };
    };
  },
  next: NextFunction
) {
  res.status(404).render("404", { title: "Error page" });
});
module.exports = router;
