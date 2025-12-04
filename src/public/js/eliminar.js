// manejo del DOM
let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
import { API_BASE_URL } from "./config.js";


// Maneja el submit del formulario de consulta de productos
// - Previene recarga de página
// - Obtiene ID ingresado
// - Llama al backend para traer producto por ID

getProducts_form.addEventListener("submit", async (event) => {
    
    event.preventDefault(); 

    let formData = new FormData(event.target); 
    
    let data = Object.fromEntries(formData.entries()); 

    let idProducto = data.id;

    try {

        let response = await fetch(`${API_BASE_URL}/${idProducto}`);
        
        let result = await response.json();
        
        console.log(result);

        if(response.ok) {
            
            let producto = result.payload[0]; 
        
            mostrarProducto(producto); 

        } else {
            
            console.error(result.message)
        
            mostrarError(result.message);
        } 

    } catch (error) {
        console.error("Error: ", error);

    }

});

/*
Renderiza un producto en el listado y agrega botón de eliminación.
PARAMETRO: Object producto - Objeto con propiedades: id, nombre_producto, precio_producto, img_producto.
*/

function mostrarProducto(producto) {
    console.table(producto);

    let htmlProducto = `
        <li class="li-listados">
            <img src="${producto.img_producto}" alt="${producto.nombre_producto}" class="img-listados">
            <p>Id: ${producto.id}/ Nombre: ${producto.nombre_producto}/ <strong>Precio: $${producto.precio_producto}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="deleteProduct_button" value="Eliminar producto">
        </li>
        `;

    listado_productos.innerHTML = htmlProducto;

    let deleteProduct_button = document.getElementById("deleteProduct_button");

    deleteProduct_button.addEventListener("click", event => {

        event.stopPropagation(); 

        let confirmacion = confirm("Querés eliminar este producto?");

        if(!confirmacion) {
            alert("Eliminacion cancelada");

        } else {
            eliminarProducto(producto.id);
        }
    });
}

/*
hace la peticion para eliminar un producto por su id.
PARAMETRO: number id - ID del producto a eliminar.
Muestra alert con resultado y limpia listado.
*/

async function eliminarProducto(id) {
    
    try {

        let response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE"
        });

        let result = await response.json();

        if(response.ok) {
            alert(result.message);

            listado_productos.innerHTML = "";

        } else {
            alert("No se pudo eliminar un producto");
            console.error(result.message);
        }

    } catch(error) {
        console.error("Error en la solicitud DELETE: ", error);
        alert("Ocurrio un error al eliminar un producto");
    }
}

/*
Muestra un mensaje de error en el listado.
PARAMETRO: {string} message - Texto del error.
*/

function mostrarError(message) {
    listado_productos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}