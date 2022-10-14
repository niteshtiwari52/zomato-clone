const { OrderModel } = require("../../database/allModels");

exports.getAllOrderByUserId = async (req, res) => {
  try {
    const { user } = req;

    const getOrders = await OrderModel.findOne({ user: user._id });

    if (!getOrders) {
      return res.status(400).json({ error: "USer order not found " });
    }

    return res.status(200).json({ order: getOrders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.addNewOrder = async (req, res) => {
  try {
    const { user } = req;

    const { orderDetails } = req.body;

    const addNewOrder = await OrderModel.findOneAndUpdate(
      { user: user._id },
      { $push: { orderDetails: orderDetails } },
      { new: true }
    );

    return req.status(200).json({ order: addNewOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
