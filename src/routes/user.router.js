import {cartManager} from "../app.js";
import UsuarioModel from "../dao/models/users.model.js";
import CartModel from "../dao/models/cart.model.js";
import jwt from "jsonwebtoken";
import {createHash, isValidPassword} from "../utils/util.js"
import {Router} from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";

const userRouter = Router();
const userController = new UserController()

userRouter.post("/register", userController.register)

userRouter.post("/login", userController.login)

userRouter.post("/logout", userController.logout)    

userRouter.get("/current", passport.authenticate("current", {session: false}), userController.current)

//userRouter.get("/admin", passport.authenticate("current", {session:false}) ,(req,res)=>



/*
//Ruta Registro
userRouter.post("/register", async (req, res)=>{
    let {usuario, password, first_name, last_name, age, email} = req.body;
   
    try{
        const existeUsuario = await UsuarioModel.findOne({usuario})
        
        if(existeUsuario){
            return res.status(400).send("Usuario Existente")
        }

        //Creo un carrito nuevo
        const nuevoCarrito = new CartModel();
        await nuevoCarrito.save

        const nuevoUsuario = new UsuarioModel({
            usuario,
            first_name,
            last_name,
            age,
            email,
            cart: nuevoCarrito._id,
            password: createHash(password)
            
        });
       
        await nuevoUsuario.save();

        const token = jwt.sign({usuario: nuevoUsuario.usuario, first_name: nuevoUsuario.first_name, last_name: nuevoUsuario.last_name, age: nuevoUsuario.age, email: nuevoUsuario.email}, "coderhouse", {expiresIn: "1h"})

        //Generamos Cookie
        res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})

        res.redirect("/api/sessions/current")

    }catch(error){
            res.status(500).send("Error del servidor al Registrar")

    }
})


//Ruta Login

userRouter.post("/login", async(req, res)=>{
    let {usuario,password} = req.body;

    try{
        //Buscar el usuario en Mongo
        const usuarioEncontrado = await UsuarioModel.findOne({usuario});
        if(!usuarioEncontrado){
            return res.status(401).send("Usuario No Identificado")
        }

        //Se verifica Contraseña
        if(!isValidPassword(password, usuarioEncontrado)){
            return res.status(401).send("Usuario No Identificado")
        }

        const token = jwt.sign({usuario: usuarioEncontrado.usuario, first_name: usuarioEncontrado.first_name, last_name: usuarioEncontrado.last_name, age: usuarioEncontrado.age, email: usuarioEncontrado.email}, "coderhouse", {expiresIn: "1h"})

        //Generamos Cookie
        res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})

        res.redirect("/api/sessions/current")

    }catch (error){
        res.status(500).send("Error del servidor")
    }

})



userRouter.get("/current", passport.authenticate("current", {session: false}), (req,res)=>{
    res.render("homeusers", {usuario: req.user.usuario})
})


//LOGOUT
userRouter.post("/logout", (req,res)=>{
    //Limpieza de COOKIE
    res.clearCookie("coderCookieToken")
    res.redirect("/login")
})

//Ruta Admin
userRouter.get("/admin", passport.authenticate("current", {session:false}) ,(req,res)=>{
    //Verifica si el usuario es administrador
    if(req.user.rol !=="admin"){
        return res.status(403).send("Acceso Denegado")
    }

    res.render("admin")
})
*/

export {userRouter};