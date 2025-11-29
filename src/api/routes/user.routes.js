import { Router } from "express";
const router = Router();
import { createUser } from "../controllers/users.controllers.js";


//ruta para crear usuario
router.post ("/", createUser);


export default router;


