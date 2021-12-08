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

module.exports = router;
