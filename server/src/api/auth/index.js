import express from "express";
import passport from "passport";
import {
  googleCallback,
  googleSignIn,
  signIn,
  signUp,
} from "../../controller/auth";

const Router = express.Router();

/**
 * Route     http://localhost:4000/api/v1/auth/signup
 * Des       signup
 * Params    none
 * Access    Public
 * Method    POST
 */

Router.post("/signup", signUp);

/**
 * Route     http://localhost:4000/api/v1/auth/signin
 * Des       signin
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/signin", signIn);

/**
 * Route     http://localhost:4000/api/v1/auth/google
 * Des       signin using google
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/google", googleSignIn);

/**
 * Route     http://localhost:4000/api/v1/auth/google/callback
 * Des       Redirect after successfull signin
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

export default Router;
