//IMPORTANTE cambiar nombres campos sql
import connection from "../database/db.js";

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


const selectProductById = (id) => {
    
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
    
    return connection.query(sql, [id]);

}

const insertProduct = (nombre_producto, precio_producto, tipo_producto, img_producto) => {
    
    let sql = "INSERT INTO productos (nombre_producto, precio_producto, tipo_producto, img_producto) VALUES (?, ?, ?, ?)";
    
    return connection.query(sql, [nombre_producto, precio_producto, tipo_producto, img_producto]);

}


const updateProduct = (nombre_producto, precio_producto, tipo_producto, img_producto, activo, id) => {
    
    let sql = `
        UPDATE productos
        SET nombre_producto = ?, precio_producto = ?, tipo_producto = ?, img_producto = ?, activo = ?
        WHERE id = ?
    `;

    return connection.query(sql, [nombre_producto, precio_producto, tipo_producto, img_producto, activo, id]); 
}


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