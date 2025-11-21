import express from "express";
const app = express(); 
import environments from "../grupo1Integrador25C2Div132_back/src/api/config/environments.js";
const PORT = environments.port;
import cors from "cors"; 
import { loggerUrl } from "../grupo1Integrador25C2Div132_back/src/api/middlewares/middlewares.js";
import { productRoutes } from "../grupo1Integrador25C2Div132_back/src/api/routes/index.js";
import { join, __dirname } from "../grupo1Integrador25C2Div132_back/src/api/utils/index.js";
import connection from "../grupo1Integrador25C2Div132_back/src/api/database/db.js";

app.use(cors());
app.use(loggerUrl);

app.use(express.json()); 
app.use(express.static(join(__dirname, "src", "public")));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));


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
})

app.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
})

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});