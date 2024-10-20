import userService from "../service/user.service.js";
import jwt from "passport-jwt"; 
//import jwt from "jsonwebtoken"; 

import UserDTO from "../dto/user.dto.js";

class UserController{

    async register(req,res){
        
        let {usuario, password, first_name, last_name, age, email} = req.body;

        try{
            const newUser = await userService.registerUser({
                usuario, password, first_name, last_name, age, email
             }
            );            
        
            const token= jwt.sign({usuario: newUser.usuario, name: newUser.first_name, lastName: newUser.last_name, email: newUser.email}, "coderhouse", {expiresIn: "1h"})
            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})
            res.redirect("/api/sessions/current")
        
        }catch (error){
            res.status(500).send({error: error})
        }
    }

    async login(req,res){
        let {email,password} = req.body
        try{
            const user= await userService.loginUser(email,password)
            const token= jwt.sign({name: user.first_name, lastName: user.last_name, email: user.email}, "coderhouse", {expiresIn: "1h"})
            res.cookie("coderCookieToken",token, {maxAge: 3600000, httpOnly:true})
            res.redirect("/api/sessions/current")
        }catch(error){
            res.status(500).send({error: error}) 
        }

    }

    async current(req,res){
        
        if(req.user) {
            const user = req.user; 
            const userDTO = new UserDTO(user); 
            res.render("homeusers", {user: userDTO}); 
        }else {
            res.send("No Autorizado"); 
        }

    }

    async logout(req,res){
        res.clearCookie("coderCookieToken")
        res.redirect("/login")
    }

}

export default UserController