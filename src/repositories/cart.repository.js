import CartDao from "../dao/cart.dao.js"

class CartRepository{

    async createCart(cartData){
        return await CartDao.save(cartData)
    }

    async getCartById(id){
        return await CartDao.findById(id)
    }

    async createCart(cartData){
        return await CartDao.save(cartData)
    }

    async updateCart(id,cartData){
        return await CartDao.update(id,cartData)
    }

    async deleteCart(id){
        return await CartDao.delete(id)
    }

}

export default new CartRepository();