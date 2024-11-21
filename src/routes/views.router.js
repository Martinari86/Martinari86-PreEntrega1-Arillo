import {Router} from "express";
import ProductModel from "../dao/models/product.model.js";
import { soloAdmin, soloUser } from "../middleware/auth.js";
import passport from "passport";


const viewsRouter = Router();

//Lista de todos los productos en la ruta /products
viewsRouter.get("/products", passport.authenticate("current", {session: false}), soloUser, async (req, res) => {
        
        let page = req.query.page || 1;
        let limit = req.query.limit || 5;
        
        const productosLista = await ProductModel.paginate({}, {limit, page});
        const productosListaFinal = productosLista.docs.map(elemento =>{
            const {_id, ...rest} = elemento.toObject();
            return rest
        })
            
        res.render("home",{
            productos: productosListaFinal,
            hasPrevPage: productosLista.hasPrevPage,
            hasNextPage: productosLista.hasNextPage,
            prevPage: productosLista.prevPage,
            nextPage: productosLista.nextPage,
            currentPage: productosLista.page,
            totalPages:productosLista.totalPages
        })
    }
)

viewsRouter.get("/realtimeproducts", passport.authenticate("current", {session: false}), soloAdmin, async (req, res) => { 
        res.render("realtimeproducts");    
    }
)

export {viewsRouter};
