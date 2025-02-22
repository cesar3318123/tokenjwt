// URL del backend
const API_URL = "https://vrn0rzfj-3000.usw3.devtunnels.ms/";

//Manejo del registro de usuario
async function registrarUsuario(event) {
    event.preventDefault();

    //Obtiene los valores ingresados en el campo de registro
    const username = document.getElementById("email").value;
    const password =  document.getElementById("contrasena").value;

    //Enviar la solicitu POST al backend con los datos del usuarios
    const response = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
}

const data = await response.json(); // Convierte la respuesta en json