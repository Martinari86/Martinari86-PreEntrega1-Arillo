import {Router} from "express";
import {productManager} from "../app.js";

const productsRouter = Router();

//Lista de todos los productos en la ruta /products
productsRouter.get("/", async (req, res) => {
    try{
        const limit = req.query.limit; //{limit} = req.query
        const productos = await productManager.getProducts();
            if(limit){
                const limitedProducts = productos.slice(0,limit);
                return res.json(limitedProducts)
            }else{
                res.send(productos);
            }
    }catch (error){
        res.send("Error en consultar los productos")
        console.log(error);
        }
    }
)

//Traer producto por ID
productsRouter.get("/:pid", async (req, res) =>{
    let pid = req.params.pid;
    try{
        const response = await productManager.getProductById(pid);

        if(!response){
            res.send("Producto No Encontrado por ID");
        }else{
            res.json(response);
        }
    } catch(error){
        console.log("Error en la busqueda por Id",error);
    }

})

//Metodo Post para transferir informacion
productsRouter.post("/", async (req, res) => {
    try{
        const {title, description, price, thumbnail, code, stock, status=true, category} = req.body;
        const response = await productManager.updateProduct([title, description, price, thumbnail, code, stock, status, category])
        res.json(response)
    }catch (error){
        res.send("Error al crear producto")
        console.log(error);
        }
    }
)

//Metodo para Actualizar un producto en la lista
productsRouter.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try{
        const {title, description, price, thumbnail, code, stock, status=true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category});
        res.json(response)
    }catch(error){
        res.send("Error al actualizar producto")
        console.log(error);

    }

  });

//Metodo Delete para eliminar productos
productsRouter.delete('/:pid', async (req, res) => {
    let pid = req.params.pid;
    try{
        await productManager.deleteProduct(pid);
        res.send("Producto Eliminado")
    }catch(error){
        res.send("Error al eliminar producto")
        console.log(error);
    }
  
  }
);




export {productsRouter};
