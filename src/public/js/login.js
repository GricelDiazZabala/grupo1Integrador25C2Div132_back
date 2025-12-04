/*
Script de Quick Login.
- Captura el botón "quickLogin".
- Rellena automáticamente los campos de email y contraseña con valores de prueba.
- Facilita el acceso rápido para el TEST.
*/


let emailUser = document.getElementById("email");
let passwordUser = document.getElementById("password");
let quickLoginBtn = document.getElementById("quickLogin");


quickLoginBtn.addEventListener("click", () => {
    emailUser.value = "quick@test";
    passwordUser.value = "123456";
});