   //ToDo: hacer la logica de login en el back y ver si lo que esta hecho funciona

let emailUser = document.getElementById("email");
let passwordUser = document.getElementById("password");
let quickLoginBtn = document.getElementById("quickLogin");


quickLoginBtn.addEventListener("click", () => {
    emailUser.value = "admin@mates.com";
    passwordUser.value = "123456";
});