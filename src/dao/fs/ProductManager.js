//const { log } = require("console");
import { log } from "console";
import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';

//const fs = require("fs").promises;

class ProductManager {
    
    constructor(){
        this.products =[];
        this.path = "./src/dao/fs/productos.json"; //productos.json        
    }

    addProduct = async ({title, description, price, thumbnail, code , stock ,status, category}) => {
        const id = uuidv4()
        let newProduct= {id, title, description, price, thumbnail, code , stock ,status, category}
        
        this.products=await this.getProducts();
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))
        return newProduct
    }

    getProducts = async() => {
        const response = await fs.readFile(this.path, 'utf-8');
        const responseJSON = JSON.parse(response);

        return responseJSON;
    }

    getProductById = async(id)=>{
        const response = await this.getProducts();
        const productFound = response.find(product => product.id === id)

        if(productFound){
            return productFound
        }else{
            console.log("Producto No Encontrado");
        }

    }

    updateProduct = async(id, {...data}) =>{
        const products = await this.getProducts();
        const index = products.findIndex(producto => producto.id===id)

        if(index!=-1){
            products[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(products))
            return products[index]
        }else{
            console.log("Producto No Encontrado");
        }
    }   

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id===id)

        if(index!=-1){
            products.splice(index,1);
            await fs.writeFile(this.path, JSON.stringify(products));
        }else{
            console.log("Producto No Encontrado");

        }
     }
}

export {ProductManager}

/*

//Testing
//Creamos la instancia PRODUCT MANAGER
const manager = new ProductManager("./productos.json");

//Llamamos a getProducts, deberia devolver un array vacio
console.log(manager.getProducts())

//Creemos un objeto
manager.addProduct("producto prueba","el mejor producto",200,"sin imagen","abc123",25);
//Chequeamos que se agrego
console.log(manager.getProducts())

//Creemos un objeto
manager.addProduct("producto prueba 2","el mejor producto2",400,"sin imagen","def123",45);
//Chequeamos que se agrego
console.log(manager.getProducts())

const testearMostrarProductos = async() =>{
    let array= await manager.getProducts();
    console.log(array);
}

testearMostrarProductos();
*/
