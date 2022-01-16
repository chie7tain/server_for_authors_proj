const Restaurant = require("../models/restaurantModel");
import { Request, Response } from "express";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);

    res.status(201).json({
      status: "sucess",
      data: {
        restaurant: newRestaurant,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
};

 export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      status: "sucess",
      data: restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
//1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name, using aggregation.
export const getRestaurantsByReg = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 2. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish using aggregation.
export const getRestaurantsByBoroughAndCuisine = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};

// 3. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn, using aggregation.
export const getRestaurantsByBorough = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 4. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn, using aggregation.
export const getRestaurantsByBoroughNot = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 5. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10, using aggregation
export const getRestaurantsByScore = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 6. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil', using aggregation.
export const getRestaurantsByCuisine = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 7. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates.., using aggregation.
export const getRestaurantsByDate = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 8. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z"., using aggregation.
export const getRestaurantsByDateAndScore = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
function ISODate(arg0: string) {
  throw new Error("Function not implemented.");
}

// 9. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52.. using aggregation
export const getRestaurantsByCoord = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 10. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns, using aggregation.
export const getRestaurantsByName = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 11. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns, using aggregation.
export const getRestaurantsByNameDesc = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
};
// 12. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order, using aggregation.
export const getRestaurantsByCuisineAndBorough = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
}
// 13. Write a MongoDB query to know whether all the addresses contains the street or not, using aggregation.
export const getRestaurantsByStreet = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.aggregate([
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error });
  }
}
