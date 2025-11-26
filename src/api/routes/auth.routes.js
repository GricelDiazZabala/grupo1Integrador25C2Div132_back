import { Router } from "express";
import { viewLogin } from  "../controllers/views.controllers.js";

const router = Router();

// cuando entran al root de localhost redirige a /login
router.get("/", (req, res) => {
    res.redirect("/login");
});

// Ruta de Login y llama al controlador para renderizar la vista
router.get("/login", viewLogin);

export default router;