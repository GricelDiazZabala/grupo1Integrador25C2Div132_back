// Seleccion del DOM
const altaUsersForm = document.getElementById("altaUsers-form");
const contenedorMensaje = document.getElementById("contenedor-mensaje");

// Maneja el submit del formulario de alta de usuarios
// - Previene recarga de página
// - Valida contraseñas (coincidir y 6 caracteres como minimo)
// - Envía datos al backend
altaUsersForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    data.password = data.password.trim();
    data.confirmPassword = data.confirmPassword.trim();
    if (!data.password.trim()) {
        mostrarMensaje("La contraseña no puede estar vacía", "error");
        return;
    }
    // Validar que la contraseña coincida 
    if (data.password !== data.confirmPassword) {
        mostrarMensaje("Las contraseñas no coinciden", "error");
        return;
    }

    if (data.password.length < 6) {
        mostrarMensaje("La contraseña debe tener al menos 6 caracteres", "error");
        return;
    }

    // si no borro esto del objeto data la api me tira error porque no espera ese campo
    delete data.confirmPassword;

    await enviarUsuario(data);
});


/*
Muestra un mensaje en el contenedor de mensajes.
PARAMETRO: string mensaje - Texto del mensaje.
PARAMETRO: string tipo - "success" o "error" (default: success).
*/

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

/*
Envía datos del usuario al backend.
PARAMETRO: Object} data - Objeto con propiedades del usuario (email, password).
Muestra mensaje de éxito o error.
*/

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


