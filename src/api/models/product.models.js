//IMPORTANTE cambiar nombres campos sql
import connection from "../database/db.js";

/*
Obtiene todos los productos activos.
RETURN: Promise - Promesa con filas de productos activos.
*/
const selectAllProducts = () => {

    const sql = "SELECT * FROM productos WHERE activo = 1";
    
    return connection.query(sql);

}


//todo : arreglar la paginacion

/*
export const selectProducts = async (limit = 10, offset = 0) => {
    const sqlTotal = "SELECT COUNT(*) AS total FROM productos WHERE activo = 1";
    const [[ {total} ]] = await connection.query(sqlTotal);
    const sql = "SELECT * FROM productos WHERE activo = 1 LIMIT ? OFFSET ?";
    const [rows] = connection.query(sql, [limit, offset]);
    return { rows, total };
}
    */ 


/*
Obtiene un producto por su ID.
PARAMETRO: number id - ID del producto.
RETURN: Promise - Promesa con filas del producto encontrado.
*/
const selectProductById = (id) => {
    
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
    
    return connection.query(sql, [id]);

}

/*
Inserta un nuevo producto en la base de datos.
PARAMETRO: string nombre_producto - Nombre del producto.
PARAMETRO: number precio_producto - Precio del producto.
PARAMETRO: string tipo_producto - Tipo del producto.
PARAMETRO: string img_producto - Ruta de la imagen del producto.
RETURN: Promise - Promesa con resultado de la inserción.
*/
const insertProduct = (nombre_producto, precio_producto, tipo_producto, img_producto) => {
    
    let sql = "INSERT INTO productos (nombre_producto, precio_producto, tipo_producto, img_producto) VALUES (?, ?, ?, ?)";
    
    return connection.query(sql, [nombre_producto, precio_producto, tipo_producto, img_producto]);

}

/*
Actualiza un producto existente.
PARAMETRO: string nombre_producto - Nombre actualizado.
PARAMETRO: number precio_producto - Precio actualizado.
PARAMETRO: string tipo_producto - Tipo actualizado.
PARAMETRO: string img_producto - ruta de Imagen actualizada.
PARAMETRO: number activo - Estado (1 activo, 0 inactivo).
PARAMETRO: number id - ID del producto a actualizar.
RETURN: Promise - Promesa con resultado de la actualización.
*/
const updateProduct = (nombre_producto, precio_producto, tipo_producto, img_producto, activo, id) => {
    
    let sql = `
        UPDATE productos
        SET nombre_producto = ?, precio_producto = ?, tipo_producto = ?, img_producto = ?, activo = ?
        WHERE id = ?
    `;

    return connection.query(sql, [nombre_producto, precio_producto, tipo_producto, img_producto, activo, id]); 
}

/*
Desactiva un producto (borrado lógico).
PARAMETRO: number id - ID del producto a desactivar.
RETURN: Promise - Promesa con resultado de la operación.
*/
const deleteProduct = (id) => {

    let sql = `UPDATE productos set activo = 0 WHERE id = ?`;

    return connection.query(sql, [id]);
}


export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}