import express from "express";
import passport from "passport";
import { UserModel } from "../../database/allModels";
import { validateId } from "../../validation/common.validation";

const Router = express.Router();

/**
 * Route     /
 * Des       Get Authorized user data
 * Params    none
 * Access    Private
 * Method    GET
 */

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { email, fullName, phoneNumber, address } = req.user;

      return res.json({ user: { email, fullName, phoneNumber, address } });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

/**
 * Route     /:id
 * Des       Get user data( For the review)
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const getUser = await UserModel.findById(_id);
    if (!getUser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const { fullname } = getUser;

    return res.status(200).json({ user: { fullname } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /:id
 * Des       Update user data
 * Params    _id
 * Access    Private
 * Method    PUT
 */

Router.put(
  "/update/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      await validateId(req.params);
      const { userData } = req.body;

      userData.password = undefined;

      const updateUserData = await UserModel.findByIdAndUpdate(
        _id,
        { $set: userData },
        { new: true }
      );
      console.log(updateUserData);

      return res.status(200).json({ user: updateUserData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
