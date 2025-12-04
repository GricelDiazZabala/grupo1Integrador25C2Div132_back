import mysql from "mysql2/promise";

import environments from "../config/environments.js";


/*
Configuración de la conexión a la base de datos MySQL.
Utiliza mysql2/promise para manejar consultas asincrónicas.
La configuración se obtiene desde environments.js.
Exporta un pool de conexiones reutilizable para toda la aplicación.
*/

const { database } = environments;

const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;