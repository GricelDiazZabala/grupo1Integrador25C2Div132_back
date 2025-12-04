import { Router } from "express";
import { viewIndex, viewConsultar, viewCrear, viewModificar, viewEliminar, viewCrearUsuario } from "../controllers/views.controllers.js";

const router = Router();

// rutas de las vistas a partir de /admin

// GET /ADMIN/INDEX renderiza la vista principal del panel de admin
router.get("/index", viewIndex);

// GET /ADMIN/CONSULTAR renderiza la vista para consultar productos
router.get("/consultar", viewConsultar);

// GET /ADMIN/CREAR renderiza la vista para crear productos
router.get("/crear", viewCrear);

// GET /ADMIN/MODIFICAR renderiza la vista para modificar productos
router.get("/modificar", viewModificar);

// GET /ADMIN/ELIMINAR renderiza la vista para eliminar productos
router.get("/eliminar", viewEliminar);

// GET /ADMIN/CREARUSUARIO renderiza la vista para crear usuarios
router.get("/crearUsuario", viewCrearUsuario)

export default router;