import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    contraseña:{
        type: String,
        required: true
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    verificationToken:{
        type: String
    },
    fechaCreacion:{
        type: Date,
        default: Date.now
    },
    avtive:{
        type: Boolean,
        default: true
    },
})

const User = mongoose.model("User", userSchema)

export default User