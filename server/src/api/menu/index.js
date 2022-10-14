import express from "express";
import { getMenuImageListById, getMenuListById } from "../../controller/menu";

const Router = express.Router();

/**
 * Route     http://localhost:4000/api/v1/menu/list/:_id
 * Des       Get menu based on menu id
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/list/:id", getMenuListById);

/**
 * Route     http://localhost:4000/api/v1/menu/image/:_id
 * Des       Get all list of menu images with id
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/image/:_id", getMenuImageListById);

export default Router;
