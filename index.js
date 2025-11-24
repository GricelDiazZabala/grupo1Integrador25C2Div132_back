// -------------------- IMPORTS --------------------
import express from "express";
import cors from "cors"; 
import environments from "./src/api/config/environments.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productsRoutes } from "./src/api/routes/index.js";
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
// Configuramos EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));

// -------------------- RUTAS PRINCIPALES --------------------
app.get("/", (req, res) => {
    res.render("login", {
        title: "Login de administrador",
        about: "Ingrese sus credenciales para continuar"
    });
});

// Ruta que consulta productos y renderiza vista index.ejs
app.get("/index", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos WHERE activo = 1");
        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            productos: rows
        }); 
    } catch (error) {
        console.log(error);
    }
});

// Vistas para consultar productos por id
app.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id:"
    });
});


// Vista para crear productos
app.get("/crear", (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});

// Vista para modificar productos
app.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
});


// Vista para borrar productos
app.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
});

// -------------------- RUTAS API --------------------
app.use("/api/products", productsRoutes);

// -------------------- SERVIDOR --------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`);
});