import { API_BASE_URL } from "./config.js";

let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
let contenedor_formulario = document.getElementById("contenedor-formulario");

// Consultar producto por ID
getProducts_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const idProducto = data.id;

    try {
        const response = await fetch(`${API_BASE_URL}/${idProducto}`);
        const result = await response.json();

        if (response.ok) {
            const producto = result.payload[0];
            mostrarProducto(producto);
        } else {
            mostrarError(result.message);
        }
    } catch (error) {
        console.error("Error: ", error);
    }
});

// Mostrar producto consultado
function mostrarProducto(producto) {
    listado_productos.innerHTML = `
        <li class="li-listados">
            <img src="${producto.img_producto}" alt="${producto.nombre_producto}" class="img-listados">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre_producto} / <strong>Precio: $${producto.precio_producto}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="updateProduct_button" value="Actualizar producto">
        </li>
    `;

    document.getElementById("updateProduct_button")
        .addEventListener("click", (event) => crearFormularioPut(event, producto));
}

// Crear formulario de actualización
function crearFormularioPut(event, producto) {
    event.stopPropagation();

    contenedor_formulario.innerHTML = `
        <form id="updateProducts-form" class="products-form-amplio" enctype="multipart/form-data">
            <input type="hidden" name="id" value="${producto.id}">
            <div>
                <label for="nameProd">Nombre</label>
                <input type="text" name="nombre_producto" id="nameProd" value="${producto.nombre_producto}" required>
            </div>
            <div>
                <label for="priceProd">Precio</label>
                <input type="number" name="precio_producto" id="priceProd" value="${producto.precio_producto}" required>
            </div>
            <div>
                <label for="categoryProd">Categoria</label>
                <select name="tipo_producto" id="categoryProd" required>
                    <option value="mate" ${producto.tipo_producto === "mate" ? "selected" : ""}>mate</option>
                    <option value="termo" ${producto.tipo_producto === "termo" ? "selected" : ""}>termo</option>
                </select>
            </div>
            <label id="dropArea" class="drop-zone">
                <img src="/img/subir-imagen.png" alt="Subir imagen" class="upload-icon">
                <p class="drop-text">Arrastra un archivo aquí o <span>explora</span></p>
                <p class="drop-subtext">Tamaño máximo: 5MB</p>
                <input type="file" id="fileInput" name="image" accept="image/*" />
            </label>
            <div class="file-preview" id="filePreview">
                <div id="fileName">Archivo: </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="progressFill"></div>
                </div>
            </div>
            <div>
                <label for="activo">Activo</label>
                <input type="checkbox" name="activo" id="activo" value="1" ${producto.activo ? "checked" : ""}>
            </div>
            <input type="submit" value="Actualizar producto">
        </form>
    `;

    document.getElementById("updateProducts-form")
        .addEventListener("submit", actualizarProducto);

    // Activar drag & drop
    activarDragAndDrop();
}

// Actualizar producto
async function actualizarProducto(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch(API_BASE_URL, {
            method: "PUT",
            body: formData 
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            listado_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}

// Mostrar error
function mostrarError(message) {
    listado_productos.innerHTML = `
        <li class="mensaje-error">
            <p><strong>Error:</strong> <span>${message}</span></p>
        </li>
    `;
}

// Drag & Drop
function activarDragAndDrop() {
    const dropArea = document.getElementById("dropArea");
    const fileInput = document.getElementById("fileInput");
    const filePreview = document.getElementById("filePreview");
    const fileName = document.getElementById("fileName");
    const progressFill = document.getElementById("progressFill");

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length) {
            showFile(fileInput.files[0]);
        }
    });

    ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            dropArea.classList.add("dragover");
        });
    });

    ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            dropArea.classList.remove("dragover");
        });
    });

    dropArea.addEventListener("drop", e => {
        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            showFile(files[0]);
        }
    });

    function showFile(file) {
        filePreview.style.display = "flex";
        fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        progressFill.style.width = "0%";
        progressFill.style.backgroundColor = "#2563eb";
    }
}
