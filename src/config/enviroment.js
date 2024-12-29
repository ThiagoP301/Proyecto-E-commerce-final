import dotenv from "dotenv"

//configuramos en process.env las variables de entorno del archivo .env
dotenv.config()

console.log(process.env.EMAIL_PASSWORD)

const ENVIROMENT= {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
    EMAIL_USER: process.env.EMAIL_USER || "",
    SECRET_KEY : "4c252f71-8389-4d6c-aa01-12e5e369ce0b",
    URL_MONGODB : process.env.URL_MONGODB,
    URL_DATABASE: process.env.URL_DATABASE
}


export default ENVIROMENT