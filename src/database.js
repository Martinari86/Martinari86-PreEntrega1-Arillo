import mongoose from "mongoose";

mongoose.connect("mongodb+srv://martinarillo86:Martinari86@cluster0.iy93g.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa"))
    .catch((error) => console.log("Hay error: ", error))
    

  
    