import {Router} from "express";
//import {cartManager} from "../app.js";

const viewUserRouter = Router();

viewUserRouter.get("/login", (req,res)=>{
    res.render("login")
})

viewUserRouter.get("/register", (req,res)=>{
    res.render("register")
})

export {viewUserRouter};