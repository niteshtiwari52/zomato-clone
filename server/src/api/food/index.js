import express from "express";
import {
  createNewFoodItems,
  getFoodBasedOnCategory,
  getFoodBasedOnRestaurant,
  getFoodById,
} from "../../controller/food";

import { FoodModel } from "../../database/allModels";
import {
  validateCategory,
  validateId,
} from "../../validation/common.validation";

const Router = express.Router();

/**
 * Route     http://localhost:4000/api/v1/food/create/newfooditems
 * Des       Create New Food Item
 * Params    none
 * Access    Public
 * Method    POST
 */
// Homework
Router.post("/create/newfooditems", createNewFoodItems);

/**
 * Route     http://localhost:4000/api/v1/food/:_id
 * Des       Get food based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/:_id", getFoodById);

/**
 * Route     /r/:_id
 * Des       Get all food based on particular restaurant
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/r/:_id", getFoodBasedOnRestaurant);

/**
 * Route     /c/:category
 * Des       Get all food based on particular category
 * Params    category
 * Access    Public
 * Method    GET
 */

Router.get("/c/:category", getFoodBasedOnCategory);

export default Router;
