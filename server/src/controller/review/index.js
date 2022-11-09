import { ReviewModel } from "../../database/allModels";

export const getRestaurantReviewById = async (req, res) => {
  try {
    const { resID } = req.params;
    const reviews = await ReviewModel.find({ restaurants: resID }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const FoodOrRestaurantReview = async (req, res) => {
  try {
    const { _id } = req.user;
    const { reviewData } = req.body;

    const review = await ReviewModel.create({ ...reviewData, user: _id });

    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
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
};
