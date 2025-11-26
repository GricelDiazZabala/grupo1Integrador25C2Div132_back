import ProductModel from "../models/product.models.js"; 

// Vista de login
const viewLogin = (req, res) => {
    res.render("login", {
        title: "Login de administrador",
        about: "Ingrese sus credenciales para continuar"
    });
};

// Vista índice que muestra todos los productos activos
const viewIndex = async (req, res) => {

    try {
        
        const [rows] = await ProductModel.selectAllProducts();
        
        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            productos: rows
        }); 
    } catch (error) {
        console.error("Error cargando vista index:", error);
        res.status(500).send("Error interno al buscar los productos");
    }
};

// Vista para consultar productos por id
const viewConsultar = (req, res) => {
    res.render("consultar",{
        title: "Consultar", 
        about: "Consultar producto por id:" 
    });
};

// Vista para crear productos
const viewCrear = (req, res) => {
    res.render("crear",{
        title: "Crear",
        about: "Crear producto"
    });
};

// Vista para modificar productos
const viewModificar = (req, res) => {
    res.render("modificar",{
        title: "Modificar",
        about: "Actualizar producto"
    });
};

// Vista para borrar productos
const viewEliminar = (req, res) => {
    res.render("eliminar",{
        title: "Eliminar",
        about: "Eliminar producto" 
    });
};


export {
    viewLogin,
    viewIndex,
    viewConsultar,
    viewCrear,
    viewModificar,
    viewEliminar
};