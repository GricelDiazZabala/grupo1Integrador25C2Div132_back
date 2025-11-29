import connection from "../database/db.js";

const insertUser = (correo, password) => {
    const sql = "INSERT INTO usuarios (correo, password) VALUES (?, ?)";
    return connection.query(sql, [correo, password]);
}


export const UserModel = {
    insertUser
};