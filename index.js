/**
Archivo principal del servidor.
Configura Express, middlewares, motor de vistas, sesiones y rutas.
Punto de entrada de la aplicación backend.
*/

// -------------------- IMPORTS --------------------
import express from "express";
import cors from "cors"; 
import environments from "./src/api/config/environments.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productsRoutes, salesRoutes, authRoutes, adminRoutes, usersRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";
import { handleMulterError } from "./src/api/middlewares/multer.middlewares.js";
import session from "express-session";
import { requireAdmin } from "./src/api/middlewares/middlewares.js";



// -------------------- CONFIGURACIÓN --------------------
const PORT = environments.port;
const SESSION_KEY = environments.session_key;

const app = express(); 

// -------------------- MIDDLEWARES --------------------

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(loggerUrl); // Middleware personalizado para registrar las URLs de las solicitudes
app.use(express.json()); // Middleware para parsear JSON en las solicitudes
app.use(express.static(join(__dirname, "src", "public"))); // Servir archivos estaticos desde la carpeta 'public'
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios



// -------------------- MOTOR DE VISTAS --------------------
// Configuramos EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));

// -------------------- CONFIGURACIÓN DE SESIONES --------------------
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));

// -------------------- RUTAS PRINCIPALES DE VISTAS --------------------

// cuando se ingresa a localhost ira directamente a /login
app.use("/", authRoutes);

// Rutas para el panel de administración
app.use("/admin", requireAdmin  ,adminRoutes);


// -------------------- RUTAS API --------------------
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/sales", salesRoutes);
app.use(handleMulterError);

// -------------------- SERVIDOR --------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`);
});