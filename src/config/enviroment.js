import dotenv from "dotenv"

//configuramos en process.env las variables de entorno del archivo .env
dotenv.config()

console.log(process.env.EMAIL_PASSWORD)

const ENVIROMENT= {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
    EMAIL_USER: process.env.EMAIL_USER || "",
    SECRET_KEY : process.env.SECRET_KEY,
    MONGO_URL : process.env.MONGO_URL
}


export default ENVIROMENT