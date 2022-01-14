import express from "express";

const router = express.Router();
import { getAllRestaurants } from "../controllers/restaurantController";

router.route("/").get(getAllRestaurants);

module.exports = router;
