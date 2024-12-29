import express from "express";
import {statusPingController} from "../controllers/StatusController.js"
import authMiddleware from "../middlewares/authmiddlewares.js";

 const statusRouter = express.Router();

statusRouter.get("/ping", statusPingController)
    

export default statusRouter