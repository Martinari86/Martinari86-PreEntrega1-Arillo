import {Router} from "express";
//import {cartManager} from "../app.js";
import CartController from "../controllers/cart.controller.js";
const cartController = new CartController()

const cartRouter = Router();

// Crear Carrito
cartRouter.post("/", cartController.addCart)

// Listamos los productos de un determinado carrito:
cartRouter.get("/:cid", cartController.getCartById)

// Agregar productos al carrito
cartRouter.post("/:cid/product/:pid", cartController.addProductsToCart)

//Eliminar carrito - CHEQUEARLO
cartRouter.delete("/:cid/product/:pid", cartController.deleteProductFromCart)

//Finalizar compra
cartRouter.post("/:cid/purchase", cartController.finalizarCompra)

/*
// Crear Carrito

cartRouter.post("/", async (req,res)=>{
    try{
        //const {products:[]} = req.body;
        const response = await cartManager.addCart();
        res.json(response)
    }catch (error){
        res.send("Error al crear producto")
        console.log(error);
    }

})

// Listamos los productos de un determinado carrito:

cartRouter.get("/:cid", async (req, res) => {
    let cid = req.params.cid;
    try{
        const cart = await cartManager.getCartById(cid)
        res.json(cart.products)
    }catch(error){
        res.send("Error al obtener producto")
    }
})

// Agregar productos al carrito

cartRouter.post("/:cid/product/:pid", async (req,res) => {
    let cid=req.params.cid;
    let pid=req.params.pid;
    let quantity=req.body.quantity || 1;

    try{
        const actualizado = await cartManager.addProductsToCart(cid,pid,quantity)
        res.json(actualizado.products)
    }catch(error){
        res.send("Error al actualizar")
        console.log(error);
    }

})

cartRouter.delete("/:cid/product/:pid", async (req,res) => {
    let cid=req.params.cid;
    let pid=req.params.pid;
    
    try{
        const actualizado = await cartManager.deleteProductFromCart(cid,pid)
        res.json(actualizado.products)
    }catch(error){
        res.send("Error al actualizar")
        console.log(error);
    }

})
*/

export {cartRouter};
