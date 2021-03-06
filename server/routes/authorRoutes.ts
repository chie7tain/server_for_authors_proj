export {};
let router = require("express").Router();

import {
  createAuthor,
  getAuthor,
  getAllAuthors,
  updateAuthor,
  deleteAuthor,
  aliasYoungAuthors,
} from "../controllers/authorController";
import { checkAuth } from "../middleware/check-auth";
// /authors
router.route("/undertwenty").get(aliasYoungAuthors, getAllAuthors);
// router.route("/createauthor").get(createAuthorForm);
router.route("/").get(getAllAuthors).post(createAuthor);

// /authors:
router.route("/:id").get(getAuthor).patch(updateAuthor).delete(deleteAuthor);

router.use(function (
  req: Request,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      render: { (arg0: string, arg1: { title: string }): void; new (): any };
    };
  }
) {
  res.status(404).render("404", { title: "Error page" });
});
module.exports = router;
