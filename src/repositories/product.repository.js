import ProductDao from "../dao/product.dao.js"

class ProductRepository{

    async createProduct(productData){
        return await ProductDao.save(productData)
    }

    async getProductById(id){
        return await ProductDao.findById(id)
    }

    async updateProduct(id,userData){
        return await ProductDao.update(id,productData)
    }

    async deleteProduct(id){
        return await ProductDao.delete(id)
    }

}

export default new ProductRepository();