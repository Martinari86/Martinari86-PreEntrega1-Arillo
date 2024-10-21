import productService from "../service/product.service.js";

class ProductController{

    async getProducts(req,res){
        
        try{    
            const result = await productService.getProducts(req.query);
            res.send({ 
                result: "success", 
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : null,
                nextLink: result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : null,
                isValid: result.docs.length > 0
            });
            console.log(result)       
        }catch (error){
            res.send("Error en consultar los productos")
            console.log(error);
            }
        }
        
    
    

    async getProductById(req,res){
        let pid = req.params.pid;
        try{
            const response = await productService.getProductById(pid);
    
            if(!response){
                res.send("Producto No Encontrado por ID");
            }else{
                res.json(response);
            }
        } catch(error){
            console.log("Error en la busqueda por Id",error);
        }
    }

    async addProduct(req,res){
        try{
            const {title, description, price, thumbnails, code, stock, status, category} = req.body;
            const newProd= req.body;
            const response = await productService.addProduct(newProd)
            res.json(response)
        }catch (error){
            res.send("Error al crear producto")
            console.log(error);
            }
        }
    
        async updateProduct(req,res){
            const pid = req.params.pid;
            try{
                const {title, description, price, thumbnail, code, stock, status=true, category} = req.body;
                const response = await productService.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category});
                res.json(response)
            }catch(error){
                res.send("Error al actualizar producto")
                console.log(error);
                }
            }

        async deleteProduct(req,res){
            let pid = req.params.pid;
            try{
                await productService.deleteProduct(pid);
                res.send("Producto Eliminado")
            }catch(error){
                res.send("Error al eliminar producto")
                console.log(error);
            }
        }
}

export default ProductController