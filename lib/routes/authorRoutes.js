"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let router = require("express").Router();
const authorController_1 = require("../controllers/authorController");
// /authors
// router.route("/createauthor").get(createAuthorForm);
router.route("/").get(authorController_1.getAllAuthors).post(authorController_1.createAuthor);
// /authors:
router.route("/:id").get(authorController_1.getAuthor).put(authorController_1.updateAuthor).delete(authorController_1.deleteAuthor);
router.use(function (req, res) {
    res.status(404).render("404", { title: "Error page" });
});
module.exports = router;
