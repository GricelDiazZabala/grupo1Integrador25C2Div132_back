   //ToDo: hacer la logica de login en el back y ver si lo que esta hecho funciona

let login_form = document.getElementById("login-form");
import { API_BASE_URL } from "./config.js";

login_form.addEventListener("submit", async (event) =>{
    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    console.log(data);

    enviarLogin(data);
});

async function enviarLogin(data) {


    try {

        let response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();

        if(response.ok) {

            console.log(result.message);
            alert(result.message);

            } else { 

                console.error(result.message);
                alert(result.message);

        }
        
    } catch (error) {
        console.error("Error: ", error);     
    }}


