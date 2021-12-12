"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let router = require("express").Router();
const auth = require("../middleware/check-auth");
const controllers_1 = require("../controllers/controllers");
// /authors
router.route("/createauthor").get(controllers_1.createAuthorForm);
router.route("/authors").get(controllers_1.getAllData).post(controllers_1.createData);
// /authors:
router
    .route("/authors/:id")
    .get(auth.checkAuth, controllers_1.getData)
    .put(auth.checkAuth, controllers_1.updateData)
    .delete(auth.checkAuth, controllers_1.deleteData);
router.use(function (req, res) {
    res.status(404).render("404", { title: "Error page" });
});
module.exports = router;
