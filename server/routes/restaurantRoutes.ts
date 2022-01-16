import express from "express";

const router = express.Router();
import {
  getAllRestaurants,
  createRestaurant,
  getRestaurantsByReg,
  getRestaurantsByCuisine,
  getRestaurantsByBorough,
  getRestaurantsByBoroughAndCuisine,
  getRestaurantsByScore,
  getRestaurantsByDate,
  getRestaurantsByDateAndScore,
  getRestaurantsByCoord,
  getRestaurantsByName,
  getRestaurantsByNameDesc,
  getRestaurantsByCuisineAndBorough,
  getRestaurantsByStreet,
} from "../controllers/restaurantController";

router.route("/").get(getAllRestaurants);
console.log(getAllRestaurants);
router.route("/restaurantByReg").get(getRestaurantsByReg);
router.route("/restaurantByCuisine").get(getRestaurantsByCuisine);

module.exports = router;
