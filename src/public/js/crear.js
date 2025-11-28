let altaProducts_form = document.getElementById("altaProducts-form");
import { API_BASE_URL } from "./config.js";

altaProducts_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        let response = await fetch(API_BASE_URL, {
            method: "POST",
            body: formData,
        });

        let result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
});

async function enviarProducto(data) {
    console.table(data);

    try {
        let response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log(response);

        let result = await response.json();
        console.log(result);

        if (response.ok) {
            console.log(result.message);
            alert(result.message);
        } else {
            console.error(result.message);
            alert(result.message);
        }
    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}

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

["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropArea.classList.add("dragover");
    });
});

["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropArea.classList.remove("dragover");
    });
});

dropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        showFile(files[0]);
    }
});

function showFile(file) {
    filePreview.style.display = "flex";
    fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(
        1
    )} KB)`;
    progressFill.style.width = "0%";
    progressFill.style.backgroundColor = "#2563eb";
}
