   //ToDo: hacer la logica de login en el back y ver si lo que esta hecho funciona

let emailUser = document.getElementById("email");
let passwordUser = document.getElementById("password");
let quickLoginBtn = document.getElementById("quickLogin");


quickLoginBtn.addEventListener("click", () => {
    emailUser.value = "quick@test";
    passwordUser.value = "123456";
});