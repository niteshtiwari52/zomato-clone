import express from "express";
import passport from "passport";
import {
  deleteReview,
  FoodOrRestaurantReview,
  getRestaurantReviewById,
} from "../../controller/review";

const Router = express.Router();

/**
 * Route    /:resId
 * Des      Get all review for a particular restaurant
 * Params   resId
 * Access   Public
 * Method   GET
 */

Router.get("/:resID", getRestaurantReviewById);

/**
 * Route    http://localhost:4000/api/v1/review/new
 * Des      Add new food/restaurant review and rating
 * Params   none
 * Access   Private
 * Method   POST
 */

Router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  FoodOrRestaurantReview
);

/**
 * Route    /delete/:id
 * Des      Delete a specific review
 * Params   _id
 * Access   Private
 * Method   Delete
 */
Router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteReview
);

export default Router;
