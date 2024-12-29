import fs from "fs"
import mongoose from "mongoose"
import { Product } from "../models/productModel.js";



mongoose.connect("mongodb+srv://thiago301:canela13@cluster0.2am0d.mongodb.net/UTN-PROGRAMACION-FULLSTACK", {
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

insertProducts();