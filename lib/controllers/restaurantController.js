"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRestaurants = exports.createRestaurant = void 0;
const Restaurant = require("../models/restaurantModel");
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRestaurant = yield Restaurant.create(req.body);
        res.status(201).json({
            status: "sucess",
            data: {
                restaurant: newRestaurant,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: "fail", message: err });
    }
});
exports.createRestaurant = createRestaurant;
const getAllRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.find();
        res.status(200).json({
            status: "sucess",
            data: restaurants,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.getAllRestaurants = getAllRestaurants;
