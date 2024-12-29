import express from 'express'
import { getProducts, getProductsById} from '../controllers/productsController.js'
import authMiddleware from '../middlewares/authmiddlewares.js'

const productRouter = express.Router()

productRouter.get('/:productId', getProductsById )
productRouter.get('/', getProducts)

export default productRouter