//const express = require("express");
import express from "express"; //OTRA FORMA DE IMPORTAR EXPRESS
import {engine} from "express-handlebars";

import {ProductManager} from "./dao/db/product-manager-db.js";
import {CartManager} from "./dao/db/cart-manager-db.js";

import {productsRouter} from "./routes/productos.router.js";
import {cartRouter} from "./routes/cart.router.js";
import {viewsRouter} from "./routes/views.router.js";

import {Server} from "socket.io";

import "./database.js"; 

import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { viewUserRouter } from "./routes/viewsuser.router.js";
import { userRouter} from "./routes/user.router.js";



const app = express();
const PUERTO = 8080;

//Instancio mis manager para usar sus metodos
const productManager = new ProductManager ();
const cartManager = new CartManager ();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();


//Configuracion Express Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use("/", viewUserRouter);
app.use("/api/sessions", userRouter);



//Referencia al servidor
const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
  });

//Instancio el Socket Server y por convencion la guardo en la contante io
const io = new Server(httpServer);
  
//Comandos desde el BackEnd

io.on("connection", async (socket) =>{
  socket.on('message', (data) => {
    console.log(`Nuevo cliente ${data}`)
});
  //Envio de los productos al front
  socket.emit("products", await productManager.getProducts());

  //Recibo el Id del producto de front y lo elimino
  socket.on("deleteProduct", async (productId) => {
    console.log("Id recibido", productId);
    productManager.deleteProduct(productId);
    socket.emit("products", await productManager.getProducts());
    console.log("Productos actualizados");
});

  socket.on("productForm" , async (data) => {
    //Gusrdamos productos creados
    const { title, description, price, thumbnail, code, stock, category } = data;
    await productManager.addProduct({ title, description, price, thumbnail, code, stock, category });
    socket.emit("products", await productManager.getProducts());
    console.log("Productos actualizados");
  });
  
})

  














export {productManager}
export {cartManager} 