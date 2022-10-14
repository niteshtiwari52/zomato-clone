import express from "express";
import passport from "passport";
import { addNewOrder, getAllOrderByUserId } from "../../controller/order";
import { OrderModel } from "../../database/allModels";
const Router = express.Router();

/**
 * Route     http://localhost:4000/api/v1/order
 * Des       Get all orders by user id
 * Params    none
 * Access    Private
 * Method    GET
 */
Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllOrderByUserId
);

/**
 * Route    http://localhost:4000/api/v1/order/new
 * Des      Add new Order
 * Params   none
 * Access   Private
 * Method   PUT or Post
 */

Router.put(
  "/new",
  passport.authenticate("jwt", { session: false }),
  addNewOrder
);

export default Router;
