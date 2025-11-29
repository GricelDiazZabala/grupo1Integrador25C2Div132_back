import { selectAllSales, insertSale, insertSaleProduct, selectVentaById } from "../models/sales.models.js";
import { generateExcel } from "../utils/exceljs.js";

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


//ToDo : hacer que el back calcule la venta total para no confiar en los datos del front y verificar que no vaya a causar error
//asegurarme que el frontend manda los datos como los necesito desde el carrito

export const createSale = async (req, res) => {

    try {
        const { nombre_usuario, productos } = req.body;
        console.log(req.body);

        if (!nombre_usuario || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({
                message: "Datos incompletos o invalidos"
            });
        }
        const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

        const [result] = await insertSale(nombre_usuario, total);
        const venta_id = result.insertId;

        for (const p of productos) {
            if (!p.id_producto || !p.cantidad || !p.precio) {
                return res.status(400).json({ message: "Producto invalido en la lista" });
            }
            await insertSaleProduct(venta_id, p.id_producto, p.cantidad, p.precio);
        }

        res.status(201).json({
            factura: {
                venta_id,
                cliente: nombre_usuario,
                fecha: new Date().toISOString(),
                productos: productos.map(p => ({
                    id: p.id_producto,
                    cantidad: p.cantidad,
                    precio_unitario: p.precio,
                    subtotal: p.precio * p.cantidad
                })),
                total
            },
            message: "Venta creada con éxito"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la venta" });

    }
};


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

// controlador para descargar todas las ventas en un archivo excel
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