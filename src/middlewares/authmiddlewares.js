import jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(400).json({ message: "Falta el token de autorización" });
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
        return res.status(400).json({ message: "Token no proporcionado en el encabezado" });
    }

    try {
        const payloadDecoded = jwt.verify(accessToken, ENVIROMENT.SECRET_KEY); 
        console.log("Usuario decodificado:", payloadDecoded);
        req.user = payloadDecoded
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}

export default authMiddleware