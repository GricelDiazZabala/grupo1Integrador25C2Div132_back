import { selectAllSales } from "../models/sales.models.js";

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
        const{ nombre_usuario, productos } = req.body;
        console.log(req.body);

        if(!nombre_usuario || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({
                message: "Datos incompletos o invalidos"
            });
        }
        const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

        const [result] = await insertSale(nombre_usuario, total);
        const venta_id = result.insertId;

        for (const p of productos) {
            await insertSaleProduct(venta_id, p.id_producto, p.cantidad, p.precio);
        }

        res.status(201).json({
        message: "Venta creada",
        venta_id: venta_id,
        total: total,
        cantidad_productos: productos.length

    });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al crear la venta"});
        
    }
};