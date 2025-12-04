import { UserModel } from "../models/users.models.js";
import { hashPassword } from "../utils/bcrypt.js";
import { comparePassword } from "../utils/bcrypt.js";

/**
Crea un nuevo usuario en la base de datos llamando al modelo.
Valida que se envíen email y password.
Encripta la contraseña con bcrypt.
Inserta el usuario en la base de datos.
PARAMETRO: Request req - Contiene email y password en req.body.
PARAMETRO: Response res - Devuelve mensaje de exito y userId o error.
*/
export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        const hashedPassword = await hashPassword(password);
        const [rows] = await UserModel.insertUser(email, hashedPassword);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            userId: rows.insertId
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

/*
Inicia sesión de usuario llamando al modelo.
Valida email y password.
Busca usuario por email en la base de datos.
Compara contraseña ingresada con la almacenada (bcrypt).
Si es correcta, guarda datos en la sesión y redirige al panel admin.
PARAMETRO: Request req - Contiene email y password en req.body.
PARAMETRO: Response res - Renderiza login con error o redirige al panel.
*/
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render("login", {
                title : "Login",
                about: "Login Dashboard",
                error: "Faltan campos requeridos"
            });
        }

        const [rows] = await UserModel.getByEmail(email);
        if (rows.length === 0) {
            return res.status(401).render("login", { title : "Login", about: "Login Dashboard", error: "Usuario no encontrado" });
        }

        const user = rows[0];

        // se compara con bycript la contraseña ingresada y la guardada
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).render("login", { title : "Login", about: "Login Dashboard", error: "Credenciales invalidas" });
        }

        // se guarda sesion con expres-session
        req.session.user = {
            id: user.id,
            email: user.correo
        };

        res.redirect("/admin/index");
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
};

/*
Cierra la sesión del usuario.
Destruye la sesión activa con express-session.
Redirige a la vista de login.
Request req - solicitud Express.
Response res - Redirige a /login o devuelve error.
*/
export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesion", err);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }
        res.redirect("/login");

    });
};