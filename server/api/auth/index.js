import express from "express";
import passport from "passport";

import { UserModel } from "../../database/allModels";
import {
  ValidateSignin,
  ValidateSignup,
} from "../../validation/auth.validation";

const Router = express.Router();

/**
 * Route     http://localhost:4000/api/v1/auth/signup
 * Des       signup
 * Params    none
 * Access    Public
 * Method    POST
 */

Router.post("/signup", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);

    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      success: true,
      token,
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     http://localhost:4000/api/v1/auth/signin
 * Des       signin
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findeByEmailAndPassword(req.body.credentials);

    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // return res.status(200).json({
    //   token: req.session.passport.user.token,
    // });

    return res.redirect(
      `http://localhost:3000/google/${req.session.passport.user.token}`
    );
  }
);

export default Router;
