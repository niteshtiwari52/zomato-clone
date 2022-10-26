import passport from "passport";
import { UserModel } from "../../database/allModels";
import {
  ValidateSignin,
  ValidateSignup,
} from "../../validation/auth.validation";

export const signUp = async (req, res) => {
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
};

export const signIn = async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);

    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const googleSignIn = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
});

export const googleCallback = (req, res) => {
  return res.status(200).json({
    token: req.session.passport.user.token,
  });

  //   return res.redirect(
  //     `http://localhost:3000/google/${req.session.passport.user.token}`
  //   );
};
