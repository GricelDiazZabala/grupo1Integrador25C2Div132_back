import connection from "../database/db.js";

/*
Inserta un nuevo usuario en la base de datos.
PARAMETRO: string correo - Correo electrónico del usuario.
PARAMETRO: string password - Contraseña encriptada del usuario.
RETURN: Promise - Promesa con resultado de la inserción.
*/

const insertUser = (correo, password) => {
    const sql = "INSERT INTO usuarios (correo, password) VALUES (?, ?)";
    return connection.query(sql, [correo, password]);
}

/*
Obtiene un usuario por correo y contraseña.
PARAMETRO: string correo - Correo electrónico del usuario.
PARAMETRO: string password - Contraseña del usuario.
RETURN: Promise - Promesa con filas del usuario encontrado.
*/
const getUser = (correo, password) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
    return connection.query(sql, [correo, password]);
}

/*
Obtiene un usuario por su correo electrónico.
PARAMETRO: string correo - Correo electrónico del usuario.
RETURN: Promise} - Promesa con filas del usuario encontrado.
*/

const getByEmail = (correo) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    return connection.query(sql, [correo]);
};

export const UserModel = {
    insertUser,
    getUser,
    getByEmail
};