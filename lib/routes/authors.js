"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let router = require("express").Router();
const controllers_1 = require("../controllers/controllers");
const check_auth_1 = require("../middleware/check-auth");
// /authors
router.route("/createauthor").get(controllers_1.createAuthorForm);
router.route("/authors").get(controllers_1.getAllData).post(controllers_1.createData);
// /authors:
router
    .route("/authors/:id")
    .get(check_auth_1.checkAuth, controllers_1.getData)
    .put(check_auth_1.checkAuth, controllers_1.updateData)
    .delete(check_auth_1.checkAuth, controllers_1.deleteData);
router.use(function (req, res) {
    res.status(404).render("404", { title: "Error page" });
});
module.exports = router;
