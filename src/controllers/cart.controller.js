import cartService from "../service/cart.service.js";
import productService from "../service/product.service.js";
import UsuarioModel from "../dao/models/users.model.js";
import TicketModel from "../dao/models/ticket.model.js";
import {generarId, calcularTotal, eliminarProductosNoDisponibles} from "../utils/util.js"
import { ObjectId } from "mongodb"

class CartController{

    async addCart(req,res){
        try{
            //const {products:[]} = req.body;
            const response = await cartService.addCart();
            res.json(response)
        }catch (error){
            res.send("Error al crear el Carrito")
            console.log(error);
        }

    }

    async getCartById (req,res){
        let cid = req.params.cid;
    try{
        const cart = await cartService.getCartById(cid)
        res.json(cart.products)
    }catch(error){
        res.send("Error al obtener el Carrito")
    }
    }

    async addProductsToCart(req,res){
        let cid=req.params.cid;
        let pid=req.params.pid;
        let quantity=req.body.quantity || 1;

        try{
            const actualizado = await cartService.addProductsToCart(cid,pid,quantity)
            res.json(actualizado.products)
        }catch(error){
            res.send("Error al actualizar")
            console.log(error);
        }

    }

    async deleteProductFromCart(req,res){
        let cid=req.params.cid;
        let pid=req.params.pid;
    
        try{
            const actualizado = await cartService.deleteProductFromCart(cid,pid)
            res.json(actualizado.products)
        }catch(error){
            res.send("Error al actualizar")
            console.log(error);
        }
    }

    async finalizarCompra(req,res){
        const cid=req.params.cid;
        try{
            const cart = await cartService.getCartById(cid)
            //console.log("carrito:", cart);
            
            const products = cart.products;
            //console.log(products);

            const productosNoDisponibles =[]
            //Validacion de Stock
            for(const item of products){
                //let pid = item.product._id;
                const objectId = item.product;
                const pid = objectId.toHexString();
                //console.log("id Producto", pid);
                const product = await productService.getProductById(pid);
                //console.log("Producto encontrado", product);
                
                if (product.stock >= item.quantity) {
                        //console.log(product.stock);
                        //console.log(item.quantity);    
                    product.stock -= item.quantity;
                        await product.save();
                    }else{
                        productosNoDisponibles.push(pid)
                    }
                }
           
            const userWithCart = await UsuarioModel.findOne({ cart: cid });
                if (userWithCart) {
                    console.log("Usuario encontrado:", userWithCart.email);
                } else {
                    console.log("No se encontró usuario con ese carrito.");
                }
           

            const ticket = new TicketModel({
                code: generarId(),
                purchase_datetime: new Date(),
                amount: await calcularTotal(cart.products),
                purchaser: userWithCart.email //userWithCart.email // aca poner el mail del usuario
            })
           
            await ticket.save();

            //Nuevo Carrito solo con los productos disponibles
            console.log("productos No Disponibles", productosNoDisponibles)
            console.log(cart.products)
            cart.products= eliminarProductosNoDisponibles(cart.products, productosNoDisponibles)
               
        /*res.render("checkout",{
                cliente: userWithCart.first_name,
                email: userWithCart.email,
                numTicket: ticket.code
        });*/
       

          res.send({
                cliente: userWithCart.first_name,
                email: userWithCart.email,
                numTicket: ticket.code,
                noDisponible: productosNoDisponibles,
                cartFinal: cart.products
        });

        }catch(error){
            res.status(500).send({error: "Error al Finalizar Compra"}) 
        }

    }







}

export default CartController
