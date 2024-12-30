import express, { Router } from 'express';
import statusRouter from  "./routes/statusRoute.js";
import authRouter from "./routes/authRoute.js";
import mongoDB from './config/dbConfig.js'; 
import cors from "cors"
import cartRoute from './routes/cartRoute.js';
import productRouter from './routes/productsRoute.js';



const app = express()
export const PORT =  process.env.PORT || 3001

app.use(cors())
app.use(express.json())


app.use("/api/status", statusRouter)
app.use("/api/auth", authRouter)
app.use("/api/cart", cartRoute)
app.use("/api/products", productRouter)



export default app