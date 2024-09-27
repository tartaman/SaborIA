const token = localStorage.getItem("token");

if (token) {
    // Si el token existe, verificamos si es válido
    fetch("https://saboria.onrender.com/verify-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}` // Incluimos el token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            console.log("Token válido, el usuario puede acceder.");
            // Aquí permitimos al usuario continuar navegando
        } else {
            console.log("Token inválido, redirigiendo al login...");
            localStorage.removeItem("token"); // Eliminamos el token
            window.location.href = "../Iniciarsesion.html"; // Redirigimos al login
        }
    })
    .catch(error => {
        console.error("Error al verificar el token:", error);
        localStorage.removeItem("token");
        window.location.href = "../Iniciarsesion.html"; // Redirigimos al login
    });
} else {
    // Si no hay token, redirigimos al login directamente
    window.location.href = "../Iniciarsesion.html";
}
