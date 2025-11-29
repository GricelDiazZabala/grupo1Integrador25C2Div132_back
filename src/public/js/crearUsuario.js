const altaUsersForm = document.getElementById("altaUsers-form");
const contenedorMensaje = document.getElementById("contenedor-mensaje");

altaUsersForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Validar que la contraseña coincida 
    if (data.password !== data.confirmPassword) {
        mostrarMensaje("Las contraseñas no coinciden", "error");
        return;
    }

    if (data.password.length < 6) {
        mostrarMensaje("La contraseña debe tener al menos 6 caracteres", "error");
        return;
    }

    // si no borro esto del objeto data la api me tira error por que no espera ese campo
    delete data.confirmPassword;

    await enviarUsuario(data);
});

function mostrarMensaje(mensaje, tipo = "success") {

    const clase = tipo === "success" ? "mensaje-exito" : "mensaje-error";

    contenedorMensaje.innerHTML = `
        <div class="${clase}">
            <p>${mensaje}</p>
        </div>
    `;

    setTimeout(() => {
        contenedorMensaje.innerHTML = "";
    }, 5000);
}


async function enviarUsuario(data) {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            mostrarMensaje("Usuario creado exitosamente");
            altaUsersForm.reset();
        } else {
            const errorData = await response.json();
            mostrarMensaje(`Error al crear el usuario: ${errorData.message}`, "error");
        }
    } catch (error) {
        mostrarMensaje(`Error al crear el usuario: ${error.message}`, "error");
    }
}


