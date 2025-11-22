// -------------------- IMPORTS --------------------
import express from "express";
import cors from "cors"; 
import environments from "./src/api/config/environments.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productosRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";

// -------------------- CONFIGURACIÓN --------------------
const PORT = environments.port;
const app = express(); 

// -------------------- MIDDLEWARES --------------------
app.use(cors());
app.use(loggerUrl);
app.use(express.json()); 
app.use(express.static(join(__dirname, "src", "public")));

// -------------------- MOTOR DE VISTAS --------------------
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));

// -------------------- RUTAS PRINCIPALES --------------------
app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});

app.get("/index", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");
        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            products: rows
        }); 
    } catch (error) {
        console.log(error);
    }
});

app.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id:"
    });
});

app.get("/crear", (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});

app.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
});

app.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
});

// -------------------- RUTAS API --------------------
app.use("/api/products", productosRoutes);

// -------------------- SERVIDOR --------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`);
});