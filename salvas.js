import { saveTask } from "../base.js"


const formulario = document.getElementById("form");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = formulario["name"];
    const telefone = formulario["number"];
    const locationForm = document.getElementById("demo");
    const latitude = locationForm.innerHTML.split("<br>")[0]
    const longitude = locationForm.innerHTML.split("<br>")[1]
    const location = {
        latitude: latitude.split(" ")[1],
        longitude: longitude.split(" ")[1]
    }

    saveTask(nome.value, telefone.value, location);
    formulario.reset();
});