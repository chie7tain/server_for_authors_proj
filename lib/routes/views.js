"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
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
router.get("/", function (req, res, next) {
    res.render("index", { title: "home" });
});
router
    .route("/authors")
    .get(function (req, res, next) {
    res.render("aboutauthor", { title: "about author" });
});
router.use(function (req, res, next) {
    res.status(404).render("404", { title: "Error page" });
});
module.exports = router;
