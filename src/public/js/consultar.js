//Seleccion de elementos DOM
let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
import { API_BASE_URL } from "./config.js";

// Maneja el evento submit del formulario y se genera el fetch
getProducts_form.addEventListener("submit", async (event) => {
    
    event.preventDefault(); 
    
    let formData = new FormData(event.target); 
    console.log(formData);
    
    let data = Object.fromEntries(formData.entries());
    console.log(data);

    let idProducto = data.id;
    console.log(idProducto);

    try {       
        
        let response = await fetch(`${API_BASE_URL}/${idProducto}`);
        console.log(response);
        
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
Renderiza un producto en el listado.
PARAMETRO: Object producto - Objeto con propiedades: id, nombre_producto, precio_producto, img_producto.
*/
function mostrarProducto(producto) {
    console.table(producto); 

    let htmlProducto = `
        <li class="li-listados">
            <img src="${producto.img_producto}" alt="${producto.nombre_producto}" class="img-producto">
            <p>Id: ${producto.id}/ Nombre: ${producto.nombre_producto}/ <strong>Precio: $${producto.precio_producto}</strong></p>
        </li>
        `;

    listado_productos.innerHTML = htmlProducto;
}

/*
Muestra un mensaje de error en el listado.
PARAMETRO: string message - Texto del error.
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