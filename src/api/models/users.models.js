import connection from "../database/db.js";

const insertUser = (correo, password) => {
    const sql = "INSERT INTO usuarios (correo, password) VALUES (?, ?)";
    return connection.query(sql, [correo, password]);
}

const getUser = (correo, password) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
    return connection.query(sql, [correo, password]);
}

const getByEmail = (correo) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    return connection.query(sql, [correo]);
};

export const UserModel = {
    insertUser,
    getUser,
    getByEmail
};