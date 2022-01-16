"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restaurantController_1 = require("../controllers/restaurantController");
router.route("/").get(restaurantController_1.getAllRestaurants);
console.log(restaurantController_1.getAllRestaurants);
router.route("/restaurantByReg").get(restaurantController_1.getRestaurantsByReg);
router.route("/restaurantByCuisine").get(restaurantController_1.getRestaurantsByCuisine);
module.exports = router;
