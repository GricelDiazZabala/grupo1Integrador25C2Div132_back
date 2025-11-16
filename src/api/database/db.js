import environments from "../config/environments.js";
import mysql from "mysql2/promise"

const {database} = environments;
const conection =  mysql.createPool({
    host: database.host,
    database:database.name,
    user: database.user,
    password: database.password
})

export default conection;