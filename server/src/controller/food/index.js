const { FoodModel } = require("../../database/allModels");
const { validateId } = require("../../validation/common.validation");

exports.createNewFoodItems = async (req, res) => {
  const newFoodItem = await FoodModel.create(req.body.food);

  return res.status(200).json({ newFoodItem });
};

exports.getFoodById = async (req, res) => {
  try {
    const { _id } = req.params;
    await validateId(req.params);
    const food = await FoodModel.findById(_id);

    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getFoodBasedOnRestaurant = async (req, res) => {
  try {
    const { _id } = req.params;
    await validateId(req.params);
    const foods = await FoodModel.find({
      restaurant: _id,
    });
    if (!foods) {
      return res.status(404).json({ error: "No food found" });
    }
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getFoodBasedOnCategory = async (req, res) => {
  try {
    const { category } = req.params;
    await validateCategory(req.params);
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    if (!foods) {
      return res
        .status(404)
        .json({ error: `No food matched with ${category}` });
    }
    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
