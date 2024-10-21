import userService from "../service/user.service.js";
//import jwt from "passport-jwt"; 
import jwt from "jsonwebtoken"; 
import UserDTO from "../dto/user.dto.js";

class UserController{

    async register(req,res){
        
        const { first_name, last_name, age, email, usuario, password } = req.body;
        
        
        try{
            const newUser = await userService.registerUser({
                first_name, last_name, age, email, usuario, password
             }
            );            
            //console.log("USER CONTROLLER", newUser);
            const token = jwt.sign({ usuario: usuario, first_name: newUser.first_name, last_name: newUser.last_name, age: newUser.age, email: newUser.email, rol: newUser.rol}, "coderhouse", {expiresIn: "1h"})
            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})
            res.redirect("/api/sessions/current")

       

        }catch (error){
            res.status(500).send({error: "Usuario Existente"});
        }
    }
    
    async login(req,res){
        let { email, password } = req.body
        //console.log("USER CONTROLLER", email);
        //console.log("USER CONTROLLER", password);

        try{
            const user= await userService.loginUser(email,password)
            //console.log("USER CONTROLLER", user);
            const token= jwt.sign({ usuario: user.usuario, name: user.first_name, lastName: user.last_name, email: user.email, rol:user.rol}, "coderhouse", {expiresIn: "1h"})
            res.cookie("coderCookieToken",token, {maxAge: 3600000, httpOnly:true})
            res.redirect("/api/sessions/current")
        }catch(error){
            res.status(500).send({error: "Error en el Login"}) 
        }

    }

    async current(req,res){
        //res.render("homeusers", {usuario: req.user.usuario}); 
        
        if(req.user) {
            const user = req.user; 
            //console.log(user);
            
            const userDTO = new UserDTO(user); 
            res.render("homeusers", {usuario: userDTO.usuario}); 
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