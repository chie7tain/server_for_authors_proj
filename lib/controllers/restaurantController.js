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
exports.getRestaurantsByStreet = exports.getRestaurantsByCuisineAndBorough = exports.getRestaurantsByNameDesc = exports.getRestaurantsByName = exports.getRestaurantsByCoord = exports.getRestaurantsByDateAndScore = exports.getRestaurantsByDate = exports.getRestaurantsByCuisine = exports.getRestaurantsByScore = exports.getRestaurantsByBoroughNot = exports.getRestaurantsByBorough = exports.getRestaurantsByBoroughAndCuisine = exports.getRestaurantsByReg = exports.getAllRestaurants = exports.createRestaurant = void 0;
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
//1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name, using aggregation.
const getRestaurantsByReg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    name: { $regex: /Reg/ },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByReg = getRestaurantsByReg;
// 2. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish using aggregation.
const getRestaurantsByBoroughAndCuisine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    borough: "Bronx",
                    cuisine: { $in: ["American", "Chinese"] },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByBoroughAndCuisine = getRestaurantsByBoroughAndCuisine;
// 3. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn, using aggregation.
const getRestaurantsByBorough = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByBorough = getRestaurantsByBorough;
// 4. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn, using aggregation.
const getRestaurantsByBoroughNot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByBoroughNot = getRestaurantsByBoroughNot;
// 5. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10, using aggregation
const getRestaurantsByScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    "grades.score": { $lte: 10 },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByScore = getRestaurantsByScore;
// 6. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil', using aggregation.
const getRestaurantsByCuisine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    cuisine: { $nin: ["American", "Chinese"] },
                    name: { $regex: /Wil/ },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByCuisine = getRestaurantsByCuisine;
// 7. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates.., using aggregation.
const getRestaurantsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    "grades.date": ISODate("2014-08-11T00:00:00Z"),
                    "grades.grade": "A",
                    "grades.score": 11,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    grades: 1,
                },
            },
        ]);
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
exports.getRestaurantsByDate = getRestaurantsByDate;
// 8. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z"., using aggregation.
const getRestaurantsByDateAndScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    "grades.date": ISODate("2014-08-11T00:00:00Z"),
                    "grades.grade": "A",
                    "grades.score": 9,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    grades: 1,
                },
            },
        ]);
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
exports.getRestaurantsByDateAndScore = getRestaurantsByDateAndScore;
function ISODate(arg0) {
    throw new Error("Function not implemented.");
}
// 9. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52.. using aggregation
const getRestaurantsByCoord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    "address.coord": {
                        $elemMatch: {
                            $gt: 42,
                            $lte: 52,
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    address: 1,
                },
            },
        ]);
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
exports.getRestaurantsByCoord = getRestaurantsByCoord;
// 10. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns, using aggregation.
const getRestaurantsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $sort: {
                    name: 1,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByName = getRestaurantsByName;
// 11. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns, using aggregation.
const getRestaurantsByNameDesc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $sort: {
                    name: -1,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByNameDesc = getRestaurantsByNameDesc;
// 12. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order, using aggregation.
const getRestaurantsByCuisineAndBorough = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $sort: {
                    cuisine: 1,
                    borough: -1,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByCuisineAndBorough = getRestaurantsByCuisineAndBorough;
// 13. Write a MongoDB query to know whether all the addresses contains the street or not, using aggregation.
const getRestaurantsByStreet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.aggregate([
            {
                $match: {
                    "address.street": {
                        $exists: true,
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    borough: 1,
                    cuisine: 1,
                },
            },
        ]);
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
exports.getRestaurantsByStreet = getRestaurantsByStreet;
