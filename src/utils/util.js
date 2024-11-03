import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import ProductModel from "../dao/models/product.model.js";



//Encriptado de PASSWORD
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//Generador de Id Aleatorio
const generarId = () => { 
    const codigo = uuidv4();
    return codigo
    }



//Calcular total de compra
/*
const calcularTotal = (products) => {
    let total=0;
    console.log(products)
    
    products.forEach(item =>{
        console.log(item.product.price)
        total += item.product.price * item.quantity
    })
    return total
}*/

const calcularTotal = async (products) => {
    let total = 0;
    
    // Pobla los productos para obtener los detalles completos
    for (let item of products) {
        const productoCompleto = await ProductModel.findById(item.product); 
        if (productoCompleto) {
            //console.log(productoCompleto.price);
            //console.log(item.quantity);
            total += productoCompleto.price * item.quantity;
        }
    }
    //console.log(total);
    return total;
}


const eliminarProductosNoDisponibles = (cart, productosNoDisponibles) => {
    return cart.filter(item => 
        !productosNoDisponibles.includes(item.product.toString())
    )
}

export {createHash, isValidPassword, generarId, calcularTotal, eliminarProductosNoDisponibles};

