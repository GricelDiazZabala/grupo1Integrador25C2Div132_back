// -------------------- IMPORTS --------------------
import express from "express";
import cors from "cors"; 
import environments from "./src/api/config/environments.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productsRoutes, salesRoutes, authRoutes, adminRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";
import { handleMulterError } from "./src/api/middlewares/multer.middlewares.js";


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

// -------------------- RUTAS PRINCIPALES DE VISTAS --------------------

// cuando se ingresa a localhost ira directamente a /login
app.use("/", authRoutes);

// Rutas para el panel de administración
app.use("/admin", adminRoutes);


// -------------------- RUTAS API --------------------
app.use("/api/products", productsRoutes);
app.use("/api/sales", salesRoutes);
app.use(handleMulterError);

// -------------------- SERVIDOR --------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`);
});