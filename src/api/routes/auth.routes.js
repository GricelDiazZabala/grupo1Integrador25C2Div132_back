import { Router } from "express";
import { viewLogin } from  "../controllers/views.controllers.js";
import { loginUser } from "../controllers/users.controllers.js";
import { logoutUser } from "../controllers/users.controllers.js";

const router = Router();

// cuando entran al root de localhost redirige a /login
router.get("/", (req, res) => {
    res.redirect("/login");
});

// GET /LOGIN Ruta de Login y llama al controlador para renderizar la vista
router.get("/login", viewLogin);

//POST /LOGIN el router llama al controlador para hacer el login y entrar al index
router.post("/login",loginUser);    

// POST /LOGOUT llama al controlador que cierra la sesion del usuario
router.post("/logout", logoutUser);  

export default router;