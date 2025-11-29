import { UserModel } from "../models/users.models.js";
import { hashPassword } from "../utils/bcrypt.js";

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
