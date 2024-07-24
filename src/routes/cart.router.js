import {Router} from "express";
import {cartManager} from "../app.js";

const cartRouter = Router();

//Obtener Carritos
cartRouter.put("/api/carts", async (req,res)=>{
    try{
        //const {products:[]} = req.body;
        const carts = await cartManager.getCarts();
        res.json(carts)
    }catch (error){
        res.send("Error al visualizar carritos")
        console.log(error);
    }


})

// Crear Carrito

cartRouter.post("/api/carts", async (req,res)=>{
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
        const carrito = await cartManager.getCartById(cid)
        res.json(carrito.products)
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
        const actualizado =await cartManager.addProductsToCart(cid,pid,quantity)
        res.json(actualizado.products)
    }catch(error){
        res.send("Error al actualizar")
    }

})

export {cartRouter};
