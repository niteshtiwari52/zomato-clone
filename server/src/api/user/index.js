import express from "express";
import passport from "passport";
import {
  updateUserDetails,
  viewProfile,
  viewPublicProfile,
} from "../../controller/user";

const Router = express.Router();

/**
 * Route     /
 * Des       Get Authorized user data/view profile
 * Params    none
 * Access    Private
 * Method    GET
 */

Router.get("/", passport.authenticate("jwt", { session: false }), viewProfile);

/**.
 * Route     /:id
 * Des       Get user data( For the review) / viewPublicProfile
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/:_id", viewPublicProfile);

/**
 * Route     /:id
 * Des       Update user details
 * Params    _id
 * Access    Private
 * Method    PUT
 */

Router.put(
  "/update/:_id",
  passport.authenticate("jwt", { session: false }),
  updateUserDetails
);

export default Router;
