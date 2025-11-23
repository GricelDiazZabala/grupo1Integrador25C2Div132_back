let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
import { API_BASE_URL } from "./config.js";


getProducts_form.addEventListener("submit", async (event) => {
    
    event.preventDefault(); 

    let formData = new FormData(event.target); 
    
    let data = Object.fromEntries(formData.entries()); // Object { id: "2" }
    console.log(data);

    let idProducto = data.id;

    try {

        let response = await fetch(`${API_BASE_URL}/${idProducto}`);
        console.log(response);

        
        let datos = await response.json();
        console.log(datos);

        
        let producto = datos.payload[0];

    
        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }


});

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


async function eliminarProducto(id) {
    
    try {

        let response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE"
        });

        console.log(response);

        let result = await response.json();

        if(response.ok) {
            alert(result.message);
            console.log(result.message);

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