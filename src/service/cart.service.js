import cartRepository from "../repositories/cart.repository.js";

class CartService{

        async addCart(){
                return await cartRepository.createCart({products:[]})
            }
           
            
         async getCartById (cid) {
                   const cartFound = await cartRepository.getCartById(cid)
                    if(!cartFound){
                        console.log("Cart No Encontrado");
                        return null;
                    }else{
                        return cartFound;
                    }
                
            }
        
        async  addProductsToCart(cid,pid,quantity=1){
                
                    const cart = await cartRepository.getCartById(cid);
                    const existProduct = cart.products.find(element => element.product.toString() === pid)
                    if(existProduct){
                        existProduct.quantity += quantity
                    } else{
                        cart.products.push({product: pid, quantity})
                    }
                    cart.markModified("products");
                    await cartRepository.updateCart(cid,cart);
                    return cart;
                }

        async  deleteProductFromCart(cid, pid){
            
                const cart = await cartRepository.getCartById(cid);
                const cartIndex = cart.findIndex(element => element.id === cid);
            
                if (cartIndex === -1) {
                  throw error;
                }
            
                const updatedProducts = cart[cartIndex].products.filter(product => product.id !== pid);
                cart[cartIndex].products = updatedProducts;
            
                // Eliminar el carrito si está vacío
                if (cart[cartIndex].products.length === 0) {
                  cart.splice(cartIndex, 1);
                }    
          
                await cartRepository.updateCart(cid,updatedProducts);
                return cart[cartIndex];
               
          
          }

}

export default new CartService()