import nodemailer from "nodemailer"
import ENVIROMENT from "../src/config/enviroment.js"

export const emailTrasnportador = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 465,              
    secure: true,           
    auth:{
        user: ENVIROMENT.EMAIL_USER,
        pass: ENVIROMENT.EMAIL_PASSWORD
    }
    })