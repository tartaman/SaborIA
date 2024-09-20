// Realizamos una petición al backend para obtener los datos
fetch("http://82.197.82.74:3000/dificultades")
.then(response => response.json())
.then(data => {
    const combo = document.querySelector("#dificultades");
    data.forEach(dificultad => {
        const option = document.createElement("option");
        option.value = dificultad.id_dificultad; // Asigna un valor basado en el id (o cualquier campo relevante)
        option.textContent = dificultad.nombre; // Muestra el nombre o cualquier campo que quieras
        combo.appendChild(option);
    });
})
.catch(error => console.error("Error al obtener las dificultades:", error));