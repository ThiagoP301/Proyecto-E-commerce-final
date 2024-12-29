import mongoDB from "mongoose"
import User from "../models/userModels.js"
import ENVIROMENT from "./enviroment.js"


//.conect se utiliza para establecer la conexion con la DB
mongoDB.connect("mongodb+srv://thiago301:canela13@cluster0.2am0d.mongodb.net/UTN-PROGRAMACION-FULLSTACK", {} )
    .then(
        () =>{
        console.log("Se establecio la conexion con MongoDB")
    }
)
    .catch(
        (error)=>{
     console.error("La conexion con MongoDB ha fallado", error)
    })
    .finally(()=>{
        console.log("El proceso de conexion con la DB esta finalizado")
    })


export default mongoDB