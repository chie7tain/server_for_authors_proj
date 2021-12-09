export {};
let router = require("express").Router();
const auth = require("../middleware/check-auth");

import {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
} from "../controllers/controllers";
// /authors

router.route("/").get(getAllData).post(auth.checkAuth, createData);

// /authors:
router
  .route("/:id")
  .get(getData)
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
