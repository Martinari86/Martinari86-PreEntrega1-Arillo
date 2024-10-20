export function soloAdmin(req, res, next) {
    if(req.user.rol === "admin") {
        next(); 
    }else{
        res.status(403).send("Acceso denegado, sólo Administradores"); 
    }
}

//Hacemos una funcion que verifique que seas user: 

export function soloUser(req, res, next) {
    if(req.user.rol === "user") {
        next(); 
    }else {
        res.status(403).send("Acceso denegado, sólo Usuarios"); 
    }
}