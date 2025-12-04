import { selectAllSales, insertSale, insertSaleProduct, selectVentaById } from "../models/sales.models.js";
import { generateExcel } from "../utils/exceljs.js";
import productModel from "../models/product.models.js"

/*
Obtiene todas las ventas desde la base de datos llamando al modelo.
PARAMETRO: Request req - solicitud Express.
PARAMETRO: Response res - Devuelve lista de ventas o error interno.
 */
export const getAllSales = async (req, res) => {

    try {

        const [rows] = await selectAllSales();
        console.log(rows);

        res.status(200).json({
            payload: rows
        });

    } catch (error) {

        console.error("ERROR obteniendo ventas: ", error.message);
        res.status(500).json({
            message: "Error al obtener ventas"
        });
    }
};


/*
Crea una nueva venta en la base de datos llamando al modelo tanto de ventas como de productos.
Valida datos recibidos desde el frontend.
Calcula subtotales y total en el backend para mayor seguridad.
Inserta la venta y sus productos asociados.
PARAMETRO: Request req - Contiene nombre_usuario y lista de productos.
PARAMETRO: Response res - Devuelve factura con detalles de la venta o error.
*/

export const createSale = async (req, res) => {
    try {
        const { nombre_usuario, productos } = req.body;
        console.log(req.body);

        // Validación inicial
        if (!nombre_usuario || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ message: "Datos incompletos o inválidos" });
        }

        let total = 0;
        const productosCalculados = [];


        for (const p of productos) {
            if (!p.id_producto || !p.cantidad) {
                return res.status(400).json({ message: "Producto invalido en la lista" });
            }

            // agarramos el objeto del backend para calcular tanto el subtotal historico de cada uno como total historico de la venta
            const [rows] = await productModel.selectProductById(p.id_producto);
            if (rows.length === 0) {
                return res.status(404).json({ message: `Producto con id ${p.id_producto} no encontrado` });
            }

            const precio = rows[0].precio_producto;
            const subtotal = precio * p.cantidad;
            total += subtotal;

            productosCalculados.push({
                id_producto: p.id_producto,
                cantidad: p.cantidad,
                precio_unitario: precio,
                subtotal,
                nombre_producto: rows[0].nombre_producto,
                tipo_producto: rows[0].tipo_producto
            });
        }

        // el insert principal 
        const [result] = await insertSale(nombre_usuario, total);
        const venta_id = result.insertId;

        // insertamos en la tabla intermedia
        for (const prod of productosCalculados) {
            await insertSaleProduct(venta_id, prod.id_producto, prod.cantidad, prod.precio_unitario);
        }

        // la respuesta que se usara para renderizar en el ticket
        res.status(201).json({
            factura: {
                venta_id,
                cliente: nombre_usuario,
                fecha: new Date().toISOString(),
                productos: productosCalculados,
                total
            },
            message: "Venta creada con éxito"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la venta" });
    }
};


/*
Obtiene una venta específica por su ID llamando al controlador.
PARAMETRO: Request req - Contiene el id en req.params.
PARAMETRO: Response res - Devuelve la venta encontrada o mensaje de error.
 */
export const getVentaById = async (req, res) => {
    try {
        let { id } = req.params;

        const [rows] = await selectVentaById(id);

        res.status(200).json({
            payload: rows[0],
            message: rows.length === 0 ? `no se encontro venta con id ${id}` : "datos obtenidos"
        })
    } catch (error) {
        console.error("ERROR obteniendo la venta: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener id",
            error: error.message
        })
    }
}

/*
Genera y descarga un archivo Excel con todas las ventas.
Request req - Solicitud Express.
Response res - Devuelve archivo Excel o mensaje de error.
*/
export const getSalesExcel = async (req, res) => {
    try {
        const [rows] = await selectAllSales();

        const workbook = generateExcel(rows);

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="ventas.xlsx"'
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        // aca se hace la escritura del archivo
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("ERROR generando archivo Excel de ventas: ", error.message);
        res.status(500).json({
            message: "Error al generar archivo Excel"
        });
    }
};