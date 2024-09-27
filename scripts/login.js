document.querySelector("#login").addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = {
        username: document.querySelector("#usuario").value,
        pass: document.querySelector("#contrasena").value
    };

    fetch("https://saboria.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify(formData) // Convertimos los datos del formulario a JSON
    })
    .then(response => response.json()
    .then(data => ({ status: response.status, body: data }))) // Procesamos el JSON y el status
    .then(({ status, body }) => {
        if (status === 200) {
            // Login exitoso, procesamos el token
            console.log("Login realizado con éxito", body);
            localStorage.setItem('token', body.token); // Guardamos el token en localStorage
            window.location.href = "../index.html"; // Redirigimos al perfil
        } else if (status === 401) {
            // Contraseña incorrecta o usuario no encontrado
            console.log("Error de autenticación:", body.message);
            document.querySelector("#error-message").textContent = body.message; // Mostramos el mensaje en el HTML
        } else {
            // Otros errores (500 por ejemplo)
            console.error("Error en el servidor:", body.message);
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        document.querySelector("#error-message").textContent = "Error en la conexión o servidor.";
    });
});