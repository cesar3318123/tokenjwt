// URL del backend
const API_URL = "http://localhost:3000/auth";

//Manejo del registro de usuario
async function iniciarSesion(event) {



    
    event.preventDefault();

    //Obtiene los valores ingresados en el campo de registro
    const username = document.getElementById("email").value;
    const password =  document.getElementById("contrasena").value;

    //Enviar la solicitu POST al backend con los datos del usuarios
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })

    const data = await response.json(); // Convierte la respuesta en json

    if (response.ok) {
        // Guarda el usuario y el token en localStorage
        localStorage.setItem("usuario", JSON.stringify({ username }));
        localStorage.setItem("token", data.token);

        alert("Inicio de sesión exitoso");

        // Redirige a la página home.html
        window.location.href = "home.html";

        // Cerrar sesión automáticamente después de 30 segundos
        setTimeout(() => {
            cerrarSesion(); // Llama a la función de cerrar sesión
        }, 30000); // 30 segundos

    } else {
        alert("Error: " + data.message);
    }




}

function verificarAutenticacion() {
    const token = localStorage.getItem("token");
    if(!token){
        alert("No tienes acceso");
        window.location.href="login.html";
    }
}

function cerrarSesion() {


    localStorage.removeItem("token")
    alert("Sesión cerrada");
    window.location.href = "login.html";


}

async function registrarUsuario(event) {
    event.preventDefault(); // Evita que el formulario se recargue automáticamente


    const username = document.getElementById("email").value;
    const password = document.getElementById("contrasena").value;


    const response = await fetch(`${API_URL}/register`, { 
        method: "POST", // Método HTTP para enviar datos
        headers: { "Content-Type": "application/json" }, // Indica que se enviará JSON
        body: JSON.stringify({ username, password }) // Convierte los datos a formato JSON
    });


    const data = await response.json();

    if (response.ok) { 

        alert("Usuario registrado con éxito");
        window.location.href = "login.html"; // Redirige a la página de inicio de sesión
    } else {

        alert("Error: " + data.message);
    }
}


if(window.location.pathname.includes("home.html")) {
    verificarAutenticacion();
}


document.addEventListener("DOMContentLoaded", ()=> {
    const loginBtn = document.getElementById("login-form");
    const registroForm = document.getElementById("registro-form");
    const logoutBtn = document.getElementById("logout-btn");

    if (loginBtn) loginBtn.addEventListener("submit", iniciarSesion);
    if (registroForm) registroForm.addEventListener("submit", registrarUsuario);
    if (logoutBtn) logoutBtn.addEventListener("click", cerrarSesion);

})


function togglePassword() {
    let input = document.getElementById("contrasena");
    if (input.type === "password") {
        input.type = "text"; // Muestra la contraseña
    } else {
        input.type = "password"; // Oculta la contraseña
    }
}