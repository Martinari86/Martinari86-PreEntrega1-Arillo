import {log} from "console";
import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';

class CartManager {

    constructor(path){
        this.path = path;
        this.carts = [];
        //this.ultId = 0;
        //this.getCarts();
    }

    //Crear Carrito

    addCart = async () =>{
        const id = uuidv4();
        let newCart ={id, products: []};
        this.carts=await this.getCarts();
        this.carts.push(newCart);
        //await fs.writeFile(this.path, JSON.stringify(this.carts))
        this.saveCarts();
        return newCart;

    }



    //Retonarnar Carrito por ID

    getCartById = async (cid) => {
        try{
            this.carts=await this.getCarts();
            const cartFound = this.carts.find (element => element.id === cid);
            if(!cartFound){
                //throw new Error ("Producto no contrado");
                console.log("Producto No Encontrado");
            }else{
                return cartFound
            }
        }catch(error){
            console.log("Error al cargar los carritos", error);    
        }
    }
    
    //Agregar productos al carrito

   addProductsToCart = async(cid,pid,quantity=1) => {
        
        const cart = await this.getCartById(cid);
        const existProduct = cart.products.find(element => element.product === pid)

        if(existProduct){
            existProduct.quantity += quantity
        } else{
            cart.products.push({product: pid, quantity})
        }

        await this.saveCarts();
        return cart;

    }
    
    
    
    //Funciones axiliares para cargar y leer Archivos

    async getCarts(){
        try{
            const response = await fs.readFile(this.path, 'utf-8');
            const responseJSON = JSON.parse(response);
            return responseJSON;
            /*
            if(this.carts.length >0){
                this.ultId = Math.max(...this.carts.map(cart => cart.id))
            } FORMA DE OBTENER EL ULTIMO ID DE LOS PRODUCTOS: MAP DEVUELVE UN ARRAY TRANSFORMADO 
            */
        }catch(error){
            console.log("Error al cargar los carritos", error);    
        }
    }

    async saveCarts(){
        await fs.writeFile(this.path, JSON.stringify(this.carts,null,2))
    }





}

export {CartManager}

