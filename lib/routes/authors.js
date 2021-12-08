"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let router = require("express").Router();
const auth = require("../middleware/check-auth");
const controllers_1 = require("../controllers/controllers");
// /authors
router.route("/").get(controllers_1.getAllData).post(auth.checkAuth, controllers_1.createData);
// /authors:
router
    .route("/:id")
    .get(controllers_1.getData)
    .put(auth.checkAuth, controllers_1.updateData)
    .delete(auth.checkAuth, controllers_1.deleteData);
module.exports = router;
