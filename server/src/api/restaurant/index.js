import express from "express";
import {
  addNewRestaurant,
  getAllRestaurantsByCity,
  getRestaurantDetailsById,
  searchRestaurant,
} from "../../controller/restaurant";

const Router = express.Router();

/**
 * Route     /add/new
 * Des       Create new restaurant
 * Params    none
 * Access    Public
 * Method    POST
 */
// Homework
Router.post("/add/new", addNewRestaurant);

/**
 * Route     /
 * Des       Get all the restuarant details based on the city
 * Params    none
 * Access    Public
 * Method    GET
 */

Router.get("/", getAllRestaurantsByCity);

/**
 * Route     http://localhost:4000/api/v1/restaurant/:_id
 * Des       Get individual restuarant details based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/:_id", getRestaurantDetailsById);

/**
 * Route     /search/:searchString
 * Des       Get restaurants details based on search string
 * Params    searchString
 * Access    Public
 * Method    GET
 */
Router.get("/search/:searchString", searchRestaurant);

export default Router;
