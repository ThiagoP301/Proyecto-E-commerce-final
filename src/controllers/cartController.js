import mongoose from "mongoose";
import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";



export class CartController  {

   static async getCart(req, res) {
        const userId = req.user.userId
        const cart = await Cart.findOne({userId}).populate('items.productId')

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' })
        }

        res.json(cart)
    }

    static async addToCart(req, res) {
        try {
            const { productId, quantity } = req.body  
            const userId= req.user.userId
    
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ message: 'ID de producto inválido.' })
            }
    
          

            console.log(userId)
    
            if (!userId) {
                return res.status(400).json({ message: 'El usuario no está autenticado.' })
            }
    
            
            let cart = await Cart.findOne({ userId })
            if (!cart) {
                cart = new Cart({ userId, items: [] })
            }
    
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
    
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId: new mongoose.Types.ObjectId(productId), quantity })

            }
    
            await cart.save();
            res.json(cart);
        } catch (error) {
            console.error('Error en addToCart:', error)
            res.status(500).json({ message: 'Error al agregar al carrito.' });
        }
    }
    
    
    static async updateQuantity(req, res) {
        console.log('Llamando a updateQuantity con datos:', req.body)
      
        const { productId, quantity } = req.body
      
        if (!productId || !quantity) {
          return res.status(400).json({ message: 'Faltan datos necesarios (productId o quantity).' })
        }
        const userId = req.user.userId

        const cart = await Cart.findOne({ userId }).populate("items.productId")
        const productObjectId = new mongoose.Types.ObjectId(productId)

        console.log(cart)
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' })
        
        const item = cart.items.find((item) => item.productId._id.toString() === productObjectId.toString())

        console.log(item)
        if (item) {
          item.quantity = quantity
          await cart.save()
          return res.json(cart)
        }else
        return res.status(404).json({ message: 'Producto no encontrado en el carrito.' })
    }


    static async removeItem(req, res) {
        const { productId } = req.body
        const userId = req.user.userId

        console.log(productId)
      
        try {
          const cart = await Cart.findOne({ userId }).populate("items.productId")

          if (!cart) return res.status(404).json({ message: "Carrito no encontrado" })

          cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId)
      
          if (cart.items.length === 0) {
            await Cart.deleteOne({ userId })
            return res.json({ message: "Carrito vacío", cart: [] })
          }

          await cart.save();
      
          return res.json({ message: "Producto eliminado", cart })
        } catch (error) {
          console.error("Error al eliminar el producto:", error)
          return res.status(500).json({ message: "Error al eliminar el producto", error })
        }
      }

      static async deleteCart(req, res)  {
        const userId = req.user.userId
        try {
          const deletedCart = await Cart.findOneAndDelete({ userId })
          if (!deletedCart) {
            return res.status(404).json({ message: 'Carrito no encontrado para el usuario.' })
          }
          return res.json({ message: 'Carrito eliminado exitosamente.' });
        } catch (error) {
          console.error('Error al eliminar el carrito:', error);
          return res.status(500).json({ message: 'Error al eliminar el carrito.', error });
        }
      };

      
      

}