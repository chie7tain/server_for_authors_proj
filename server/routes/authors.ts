export {};
let router = require("express").Router();
const auth = require("../middleware/check-auth");

import {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
  createAuthorForm,
} from "../controllers/controllers";
// /authors

router.route("/createauthor").get(createAuthorForm);
router.route("/authors").get(getAllData).post(createData);

// /authors:
router
  .route("/authors/:id")
  .get(auth.checkAuth, getData)
  .put(auth.checkAuth, updateData)
  .delete(auth.checkAuth, deleteData);

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
