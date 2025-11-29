import { UserModel } from "../models/users.models.js";
import { hashPassword } from "../utils/bcrypt.js";
import { comparePassword } from "../utils/bcrypt.js";

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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Faltan campos requeridos" });
        }

        const [rows] = await UserModel.getByEmail(email);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];

        // se compara con bycript la contraseña ingresada y la guardada
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // se guarda sesion con expres-session
        req.session.user = {
            id: user.id,
            email: user.correo
        };

        res.redirect("/admin/index");
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};
