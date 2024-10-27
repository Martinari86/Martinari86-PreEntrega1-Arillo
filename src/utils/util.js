import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';



//Encriptado de PASSWORD
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//Generador de Id Aleatorio
const generarId = () => { 
    const codigo = uuidv4();
    return codigo
    }



//Calcular total de compra

const calcularTotal = (products) => {
    let total=0;
    console.log(products)
    
    products.forEach(item =>{
        console.log(item.product.price)
        total += item.product.price * item.quantity
    })
    return total
}




export {createHash, isValidPassword, generarId, calcularTotal};

