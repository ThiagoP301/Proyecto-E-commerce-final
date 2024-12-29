import express from "express"
import { loginController, registerController, validateEmailController } from "../controllers/authController.js"
import authMiddleware from "../middlewares/authmiddlewares.js"
import { CartController } from "../controllers/cartController.js"
import cartRoute from "./cartRoute.js"

const authRouter = express.Router()

authRouter.post("/register", registerController )

authRouter.get("/validate-email/:validationToken", validateEmailController)

authRouter.post("/login",loginController)

export default authRouter