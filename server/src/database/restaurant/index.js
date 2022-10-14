import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, requried: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    mapLocation: { type: String, required: true },
    cuisine: [String],
    retaurantTimings: { type: String },
    contactNumber: { type: Number },
    website: { type: String },
    popularDishes: [String],
    averageCost: { type: Number },
    amenties: [String],
    menuImages: {
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
    menu: {
      type: mongoose.Types.ObjectId,
      ref: "menues",
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reviews",
      },
    ],
    photos: {
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
  },
  {
    timestamps: true,
  }
);

export const RestaurantModel = mongoose.model("restaurant", RestaurantSchema);
