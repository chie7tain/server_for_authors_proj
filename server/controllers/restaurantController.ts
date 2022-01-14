const Restaurant = require("../models/restaurantModel");
import {Request, Response} from 'express';

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
try{
  const restaurants = await Restaurant.find();
  res.status(200).json({
    status:"sucess",
    data:restaurants,
  })

}catch(error){
  console.log(error);
  res.status(400).json({status: "fail", message: error});
}
}

