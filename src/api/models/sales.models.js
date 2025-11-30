import connection from "../database/db.js";


export const selectAllSales = () => {

    const sql = "SELECT * FROM ventas";
    return connection.query(sql);

};

//este model es para crear la venta principal
export const insertSale = (nombre_usuario, total) => {

    const sql = "INSERT INTO ventas (nombre_usuario, total) VALUES (?, ?)";
    return connection.query(sql, [nombre_usuario, total]);

};

// este model es para crear la venta que relaciona las tablas 
export const insertSaleProduct = (id_venta, id_producto, cantidad, precio) => {

    const sql = "INSERT INTO ventas_productos (id_venta, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [id_venta, id_producto, cantidad, precio]);

};

export const selectVentaById = (id) => {

    const sql = "SELECT * FROM ventas WHERE id = ?";
    return connection.query(sql, [id]); 
};

//ToDo ver si falta agregar algun controlador, ya que luego se tendra que hacer la factura 