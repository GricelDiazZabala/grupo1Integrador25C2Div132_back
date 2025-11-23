//IMPORTANTE cambiar nombres campos sql
import connection from "../database/db.js";

const selectAllProducts = () => {

    const sql = "SELECT * FROM productos";
    return connection.query(sql);
}

const selectProductById = (id) => {
    let sql = "SELECT * FROM productos WHERE products.id = ?";

    return connection.query(sql, [id]);
}

const insertProduct = (nombre_producto, precio_producto, tipo_producto, img_producto) => {
    let sql = "INSERT INTO productos (nombre_producto, precio_producto, tipo_producto, img_producto) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [nombre_producto, precio_producto, tipo_producto, img_producto]);
}


const updateProduct = (name, image, category, price, active, id) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, img_url = ?, category = ?, price = ?, active = ?
        WHERE id = ?
    `;

    return connection.query(sql, [name, image, category, price, active, id]); 
}


const deleteProduct = (id) => {

    let sql = `DELETE FROM products WHERE id = ?`;

    let sql2 = `UPDATE products set active = 0 WHERE id = ?`;

    return connection.query(sql, [id]);
}


export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}