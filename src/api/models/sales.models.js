import connection from "../database/db.js";

/*
Obtiene todas las ventas registradas.
RETURN: Promise - Promesa con filas de ventas.
*/
export const selectAllSales = () => {

    const sql = "SELECT * FROM ventas";
    return connection.query(sql);

};

/*
Inserta una nueva venta principal en la tabla 'ventas'.
PARAMETRO: string nombre_usuario - Nombre del cliente.
PARAMETRO: number total - Total calculado de la venta.
RETURN: Promise - Promesa con resultado de la inserción.
*/
export const insertSale = (nombre_usuario, total) => {

    const sql = "INSERT INTO ventas (nombre_usuario, total) VALUES (?, ?)";
    return connection.query(sql, [nombre_usuario, total]);

};

/*
Inserta un producto asociado a una venta en la tabla 'ventas_productos'.
PARAMETRO: number id_venta - ID de la venta.
PARAMETRO: number id_producto - ID del producto.
PARAMETRO: number cantidad - Cantidad del producto vendido.
PARAMETRO: number precio - Precio unitario del producto.
RETURN: Promise - Promesa con resultado de la inserción.
*/

export const insertSaleProduct = (id_venta, id_producto, cantidad, precio) => {

    const sql = "INSERT INTO ventas_productos (id_venta, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [id_venta, id_producto, cantidad, precio]);

};

/*
Obtiene una venta específica por su ID.
PARAMETRO: number id - ID de la venta.
RETURN: Promise - Promesa con filas de la venta encontrada.
*/
export const selectVentaById = (id) => {

    const sql = "SELECT * FROM ventas WHERE id = ?";
    return connection.query(sql, [id]); 
};

//ToDo ver si falta agregar algun controlador, ya que luego se tendra que hacer la factura 