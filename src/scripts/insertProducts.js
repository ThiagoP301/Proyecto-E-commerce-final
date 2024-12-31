import fs from "fs"
import mongoose from "mongoose"
import { Product } from "../models/productModel.js";
import ENVIROMENT from "../config/enviroment.js";
import path from "path";

const MONGO_URI = ENVIROMENT.MONGO_URI


mongoose.connect( MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productsPath = path.resolve('./src/data/Products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

 const insertProducts = async () => {
    try {
        await Product.insertMany(products);
        console.log('Productos agregados con éxito');
    } catch (error) {
        console.error('Error al agregar productos:', error);
    } finally {
        mongoose.connection.close(); 
    }
};

insertProducts()