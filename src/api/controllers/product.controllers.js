import ProductModel from "../models/product.models.js";

/*
Obtiene todos los productos desde la base de datos llamando al modelo.
PARAMETRO: Request req - Objeto de solicitud Express.
PARAMETRO: Response res - Objeto de respuesta Express.
RETURN: JSON - Lista de productos o mensaje de error.
*/
export const getAllProducts = async (req, res) => {
    try {

        const [rows, fields] = await ProductModel.selectAllProducts();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {
        console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

/*
Obtiene un producto por su ID llamando al modelo.
PARAMETRO: Request req - Contiene el id del producto en req.params.
PARAMETRO: Response res - Devuelve el JSON del producto encontrado en el payload o error si no existe.
*/
export const getProductById = async (req, res) => {

    try {

        let { id } = req.params;

        const [rows] = await ProductModel.selectProductById(id);

        if (rows.length === 0) {

            console.log(`Error!! No existe producto con el id ${id}`);

            return res.status(404).json({
                message: `No se encontro producto con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.log("Error obteniendo producto por id: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

/*
Crea un nuevo producto en la base de datos llamando al modelo.
PARAMETRO: Request req - Contiene nombre, precio, tipo y archivo de imagen.
PARAMETRO: Response res - Devuelve mensaje de exito o error de validación.
*/
export const createProduct = async (req, res) => {

    try {

        let { nombre_producto, precio_producto, tipo_producto } = req.body;
        let img_producto = "/img/" + req.file?.filename;
        console.log(req.body);
        console.log(`Nombre producto: ${nombre_producto}`);


        if (!nombre_producto || !precio_producto || !tipo_producto || !img_producto) {
            return res.status(400).json({
                message: "Datos inválidos, asegurate de enviar todos los campos"
            });
        }

        let [rows] = await ProductModel.insertProduct(nombre_producto, precio_producto, tipo_producto, img_producto);


        res.status(201).json({
            message: "Producto creado con exito!",
        });

    } catch (error) {
        console.log("Error al crear producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}


/*
Modifica un producto existente llamando al modelo.
PARAMETRO: Request req - Contiene id y datos actualizados del producto.
PARAMETRO: Response res - Devuelve mensaje de exito o error si no se actualiza.
*/
export const modifyProduct = async (req, res) => {
    try {

        let { id, nombre_producto, precio_producto, tipo_producto, activo } = req.body;
        let img_producto = "/img/" + req.file?.filename;
        console.log(req.body);



        if (!id || !nombre_producto || !precio_producto || !tipo_producto || !img_producto || !activo) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let [result] = await ProductModel.updateProduct(nombre_producto, precio_producto, tipo_producto, img_producto, activo, id);

        console.log(result);



        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            })
        }


        res.status(200).json({
            message: `Producto con id: ${id} actualizado correctamente`
        });

    } catch (error) {

        console.error("Error al actualizar producto: ", error);

        res.status(500).json({
            message: `Error interno del servidor: ${error}`
        });
    }
}

/*
Elimina un producto por su ID.
PARAMETRO: Request req - Contiene el id del producto en req.params.
PARAMETRO: Response res - Devuelve mensaje de exito o error si no se elimina.
*/
export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;

        let [result] = await ProductModel.deleteProduct(id);

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: `No se elimino el producto con id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.error("Error al eliminar un producto por su id: ", error);

        res.status(500).json({
            message: `Error al eliminar producto con id: ${id}`,
            error: error.message
        });
    }
}