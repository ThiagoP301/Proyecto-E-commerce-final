import express from 'express';
import statusRouter from  "./routes/statusRoute.js";
import authRouter from "./routes/authRoute.js";
import cors from "cors"
import cartRoute from './routes/cartRoute.js';
import productRouter from './routes/productsRoute.js';
import mongoDB from './config/dbConfig.js';
import { customCorsMiddleware } from './middlewares/cors.middlewares.js';



const app = express()
export const PORT =  process.env.PORT || 3001

app.use(customCorsMiddleware)
app.use(cors())
app.use(express.json())


app.use("/api/status", statusRouter)
app.use("/api/auth", authRouter)
app.use("/api/cart", cartRoute)
app.use("/api/products", productRouter)

app.listen(PORT, (req, res)=>{
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})

export default app