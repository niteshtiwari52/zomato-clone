import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/allModels";

import { s3Upload } from "../../utils/s3";
import {
  getImageDetails,
  uploadMultipleImagesInS3Bucket,
  uploadSingleImageInS3Bucket,
} from "../../controller/image";

const Router = express.Router();

// multer configure
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Route     /:_id
 * Des       Get image details
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", getImageDetails);

/**
 * Route     http://localhost:4000/api/v1/image/upload/single
 * Des      Upload given image to s3 bucket and save file link to mongoDb
 * Params    _id
 * Access    Public
 * Method    POST
 */
Router.post(
  "/upload/single",
  upload.single("file"),
  uploadSingleImageInS3Bucket
);

Router.post(
  "/upload/multiple",
  upload.array("file", 4),
  uploadMultipleImagesInS3Bucket
);

export default Router;
