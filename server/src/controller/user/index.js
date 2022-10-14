const { UserModel } = require("../../database/user");
import { validateId } from "../../validation/common.validation";
// view profile

exports.viewProfile = async (req, res) => {
  try {
    // const { email, fullName, phoneNumber, address } = req.user;
    // return res.json({ user: { email, fullName, phoneNumber, address } });
    const userDetails = req.user;
    return res.status(200).json({ user: { userDetails } });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// view public profile (at review)

exports.viewPublicProfile = async (req, res) => {
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
};

// update User Details
exports.updateUserDetails = async (req, res) => {
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
};
