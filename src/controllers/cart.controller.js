import cartService from "../service/cart.service.js";

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







}

export default CartController
