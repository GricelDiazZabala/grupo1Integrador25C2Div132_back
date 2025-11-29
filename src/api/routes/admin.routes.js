import { Router } from "express";
import { viewIndex, viewConsultar, viewCrear, viewModificar, viewEliminar, viewCrearUsuario } from "../controllers/views.controllers.js";

const router = Router();

// rutas de las vistas a partir de /admin

router.get("/index", viewIndex);

router.get("/consultar", viewConsultar);

router.get("/crear", viewCrear);

router.get("/modificar", viewModificar);

router.get("/eliminar", viewEliminar);

router.get("/crearUsuario", viewCrearUsuario)

export default router;