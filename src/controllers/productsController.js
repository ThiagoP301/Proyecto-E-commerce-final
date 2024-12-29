import mongoose from "mongoose";
import { Product } from "../models/productModel.js";
import { Cart } from "../models/cartModel.js";

export const getProducts = async (req,res) =>{

try {
    const products = await Product.find()
    res.json(products)  
} catch (error) {
    res.status(500).json({message: "error al obtener los productos", error})
}
}

export const getProductsById = async (req, res) =>{
    const {productId} = req.params

    console.log(productId)

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
}

