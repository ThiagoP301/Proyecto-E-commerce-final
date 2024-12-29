import express from "express";
import {statusPingController} from "../controllers/StatusController.js"
import authMiddleware from "../middlewares/authmiddlewares.js";

 const statusRouter = express.Router();

statusRouter.post("/ping", statusPingController)
    

export default statusRouter