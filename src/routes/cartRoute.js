import express from "express"

import authMiddleware from "../middlewares/authmiddlewares.js";
import { CartController } from "../controllers/cartController.js";


const cartRoute = express.Router()

cartRoute.get("/", authMiddleware, CartController.getCart);
cartRoute.post("/add", authMiddleware, CartController.addToCart);
cartRoute.put("/update", authMiddleware, CartController.updateQuantity);
cartRoute.delete("/remove", authMiddleware, CartController.removeItem);
cartRoute.delete("/delete-cart", authMiddleware, CartController.deleteCart)

export default cartRoute