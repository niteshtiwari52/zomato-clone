import { RestaurantModel } from "../../database/allModels";
import {
  validateRestaurantCity,
  validateSearchString,
} from "../../validation/restaurant.validation";

export const addNewRestaurant = async (req, res) => {
  const newRestaurant = await RestaurantModel.create(
    req.body.restaurantDetails
  );

  return res.status(200).json({ newRestaurant });
};

export const getAllRestaurantsByCity = async (req, res) => {
  try {
    // http://localhost:4000/restaurant/?city=ncr
    const { city } = req.query;
    await validateRestaurantCity(req.params);
    const restaurants = await RestaurantModel.find({ city });
    if (restaurants.length === 0) {
      return res.status(404).json({ error: "No restraunt found in this city" });
    }
    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRestaurantDetailsById = async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById({ _id });
    console.log(restaurant);

    if (!restaurant) {
      return res.status(400).json({ error: "Restaurant not found" });
    }

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchRestaurant = async (req, res) => {
  /**
   * searchString = Raj
   * results = {
   *  RajHotel
   *  RajRow
   *  RonRaj
   *  raJRow
   * }
   */
  try {
    const { searchString } = req.params;
    await validateSearchString(req.params);
    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });

    if (!restaurants.length === 0) {
      return res
        .status(404)
        .json({ error: `No restaurant matched with ${searchString}` });
    }

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
