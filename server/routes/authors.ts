export {};
let router = require("express").Router();

import {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
  createAuthorForm,
} from "../controllers/controllers";
import { checkAuth } from "../middleware/check-auth";
// /authors

router.route("/createauthor").get(createAuthorForm);
router.route("/authors").get(getAllData).post(createData);

// /authors:
router
  .route("/authors/:id")
  .get(checkAuth, getData)
  .put(checkAuth, updateData)
  .delete(checkAuth, deleteData);

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
