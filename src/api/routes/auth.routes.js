import { Router } from "express";
import { viewLogin } from  "../controllers/views.controllers.js";
import { loginUser } from "../controllers/users.controllers.js";
import { logoutUser } from "../controllers/users.controllers.js";

const router = Router();

// cuando entran al root de localhost redirige a /login
router.get("/", (req, res) => {
    res.redirect("/login");
});

// Ruta de Login y llama al controlador para renderizar la vista
router.get("/login", viewLogin);

//el router llama al controlador para hacer el login y entra al index
router.post("/login",loginUser);    

router.post("/logout", logoutUser);  

export default router;