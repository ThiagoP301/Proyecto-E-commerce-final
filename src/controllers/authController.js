import { verifyContraseña, verifyEmail, verifyNombre, verifyEmailUser, verifyNameUser } from "../../helpers/validaciones.js"
import ENVIROMENT from "../config/enviroment.js"
import User from "../models/userModels.js"
import bcryptjs from "bcryptjs"
import { PORT } from "../server.js"
import jwt from "jsonwebtoken"
import { emailTrasnportador } from "../../helpers/emailTransporter.js"



export const registerController = async (req, res) =>{
    const {nombre, contraseña, email} = req.body    

    const camposState={
        nombre:{
            value: nombre,
            error : [],
            validations: [
                verifyNombre,
                verifyNameUser
            ]
        },
        contraseña: {
            value: contraseña,
            error : [], 
            validations: [
                verifyContraseña
            ]
        },
        email: {
            value: email,
            error : [],
            validations: [
                verifyEmail,
                verifyEmailUser
            ]
        }
    }

    let hayErrores= false
    for(let field in camposState){
        for(let validation of camposState[field].validations){
            let result =  await validation(camposState[field].value)
            if(result){
                hayErrores = true
                camposState[field].error.push(result)
            }
        }
    }

    if(hayErrores){
        res.json({ok: false,
            status: 400,
            message: "No se ha podido registrar el usuario",
            payload: {
                registerState : camposState
            }
        })
        return
    }

    const hashedContraseña= await bcryptjs.hash(camposState.contraseña.value, 10)

    const validationToken = jwt.sign({email : camposState.email.value}, ENVIROMENT.SECRET_KEY, {expiresIn : "1d"} )

    const redirectUrl = `http://localhost:${PORT}/api/auth/validate-email/` + validationToken
    const result = await emailTrasnportador.sendMail({
        subject : "Valida tu email",
        to : camposState.email.value,
        html: `
            <h1>PARA INICIAR SESION EN NUESTRA PAGINA PRIMERO VALIDA TU EMAIL </h1>
            <p> Para validar tu email da click <a href= "${redirectUrl}"> aqui </a></p>
        `
    })

    const userCreate = new User({
            name: camposState.nombre.value,
            email: camposState.email.value,
            contraseña: hashedContraseña,
            verificationToken: validationToken
        })
        await userCreate.save()


    res.json({ok: true,
        status: 200,
        message: "usuario registrado correctamente",
        payload: {
            nombre : nombre,
            contraseña : contraseña,
            email : email
        }
    })

   
}
 export const validateEmailController = async (req, res) => {
        const {validationToken} = req.params
        console.log("el token es ", validationToken)
        const payload = jwt.verify(validationToken, ENVIROMENT.SECRET_KEY)

        const emailVerify = payload.email //Obtengo el email de la verificacion
        const userVerify = await User.findOne({email: emailVerify})//Lo busco en la base de datos

        userVerify.emailVerified = true //asigno que el email fue verificado

        userVerify.save()//lo guardo para que se actualice el emailVerified en la base de datos
        console.log(userVerify)
        res.redirect("http://localhost:5173/login")

    }

   export const loginController = async (req, res) => {
    const { email, contraseña } = req.body;


    if (!email || !contraseña) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "El email y la contraseña son requeridos",
        });
    }

    const camposState = {
        email: {
            value: email,
            error: [],
            validations: [verifyEmail],
        },
        contraseña: {
            value: contraseña,
            error: [],
            validations: [verifyContraseña],
        },
    };

    let hayErrores = false;
    for (let field in camposState) {
        for (let validation of camposState[field].validations) {
            let result = validation(camposState[field].value);
            if (result) {
                hayErrores = true;
                camposState[field].error.push(result);
            }
        }
    }

    if (hayErrores) {
        return res.json({
            ok: false,
            status: 400,
            message: "El email o la contraseña es incorrecta",
            payload: { registerState: camposState },
        });
    }

    const existeUsuario = await User.findOne({ email: email });
    if (!existeUsuario) {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: "Usuario no encontrado",
        });
    }

    const hashedContraseña = existeUsuario.contraseña;
    if (!await bcryptjs.compare(contraseña, hashedContraseña)) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Contraseña incorrecta",
        });
    }

    if (!existeUsuario.emailVerified) {
        return res.status(403).json({
            ok: false,
            status: 403,
            message: "El email no ha sido verificado",
        });
    }

    const accessToken = jwt.sign(
        {
            userId: existeUsuario.id,
            nombre: existeUsuario.name,
            email: existeUsuario.email,
        },
        ENVIROMENT.SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.json({
        ok: true,
        status: 200,
        message: "Usuario logueado con éxito",
        payload: {
            accessToken: accessToken,
            userInfo: {
                userId: existeUsuario.id,
                nombre: existeUsuario.name,
                email: existeUsuario.email,
            },
        },
    });
};


