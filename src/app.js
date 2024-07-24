//const express = require("express");
import express from "express"; //OTRA FORMA DE IMPORTAR EXPRESS
import {ProductManager} from "./managers/productManager.js";
import {productsRouter} from "./routes/productos.router.js";
import {cartRouter} from "./routes/cart.router.js";
import {CartManager} from "./managers/CartManager.js";

const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.json());

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


//Listen del servidor
app.listen(PUERTO, ()=> {
    console.log("Escuchado en el http:/localhost:${PUERTO}"+PUERTO);
})

export const productManager = new ProductManager ('./src/data/productos.json');
export const cartManager = new CartManager ('./src/data/carts.json');