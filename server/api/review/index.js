import express from "express";
import passport from "passport";

import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route    /:resId
 * Des      Get all review for a particular restaurant
 * Params   resId
 * Access   Public
 * Method   GET
 */

Router.get("/:resId", async (req, res) => {
  try {
    const { resID } = req.params;
    const reviews = await ReviewModel.find({ restaurants: resId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route    /new
 * Des      Add new food/restaurant review and rating
 * Params   none
 * Access   Private
 * Method   POST
 */

Router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.user;
      const { reviewData } = req.body;

      const review = await ReviewModel.create({ ...reviewData, user: _id });

      return res.status(200).json({ review });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
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
  async (req, res) => {
    try {
      const { user } = req;

      const { id } = req.params;

      const data = await ReviewModel.findOneAndDelete({
        _id: id,
        user: user._id,
      });

      if (!data) {
        return res.json({ message: "Review cannot delete this post " });
      }

      return res
        .status(200)
        .json({ message: "successfully deleted your review", data });
    } catch (error) {
      return;
      res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
