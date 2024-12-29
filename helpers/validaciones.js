import User from "../src/models/userModels.js";

export const verifyNombre = (value) => {
    const valor = value.trim()
    if(valor === ""){
        return "Debes ingresar un nombre de usuario"
    }
    if (!isNaN(valor)) {
        return "El nombre de usuario ingresado no es un string";
    }
    if(valor.length <= 6){
        return "El nombre de usuarios debe contener al menos 6 caracteres"
    }

    return null; 
}

export const verifyEmail = (value) => {
    const valor = value.trim()
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regexEmail.test(valor)) {
        return "El email ingresado no es válido"
    }
    return null
}

export const verifyContraseña = (value) => {
    const valor = value.trim()
  const regexContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
    if(!regexContraseña.test(valor)){
        return "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
    }
    return null
}

export const verifyEmailUser = async (value) => {
    const email = value.trim()
    const existeUser = await User.findOne({ email });
    if (existeUser) {
        return "El email que ingresaste ya existe"
    }
     return null
    
}

export const verifyNameUser = async (value) => {
    const name = value.trim()
    const existeUser = await User.findOne({name})
    if(existeUser){
        return "El nombre de usuario que ingresaste ya existe"
    }
    return null
    
}
 
