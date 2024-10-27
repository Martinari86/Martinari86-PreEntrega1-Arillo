import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    usuario: {type: String},
    password: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    age: {type: Number},
    rol: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }



})

const UsuarioModel = mongoose.model("usuarios", userSchema);

export default UsuarioModel;



