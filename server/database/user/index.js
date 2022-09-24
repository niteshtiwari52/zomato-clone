import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, requried: true },
    password: { type: String },
    // use only at the time of order
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

// Attachments
UserSchema.methods.generateJwtToken = function () {};

// helper functions

UserSchema.statics.findByEmailAndPhone = async () => {};

UserSchema.statics.findeByEmailAndPassword = async () => {};

export const UserModel = mongoose.model("users", UserSchema);
