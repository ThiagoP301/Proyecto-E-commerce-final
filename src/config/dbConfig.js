import mongoDB from "mongoose"
import User from "../models/userModels.js"
import ENVIROMENT from "./enviroment.js"

const MONGO_URL = ENVIROMENT.MONGO_URL

mongoDB.connect(MONGO_URL, {} )
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