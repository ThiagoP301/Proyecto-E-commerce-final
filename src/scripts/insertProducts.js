import fs from "fs"
import mongoose from "mongoose"
import { Product } from "../models/productModel.js";
import ENVIROMENT from "../config/enviroment.js";

const MONGO_URL = ENVIROMENT.URL_MONGODB + ENVIROMENT.URL_DATABASE


mongoose.connect( MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const products = JSON.parse(fs.readFileSync('./src/data/Products.json', 'utf-8'));

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
