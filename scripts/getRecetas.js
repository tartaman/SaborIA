const containerRecetas = document.querySelector('#container-recetas')
fetch(`${API_URL}/Recetas`, {
    method: `GET`,
    headers: {
        'Authorization': `Bearer ${token}` // Indicamos que estamos enviando JSON
    }
})
.then(response => response.json())
.then(data => {
    console.log("Recetas obtenidas:", data);

    data.forEach(receta => {
        mainDiv = document.createElement("div");
        mainDiv.classList.add("receta");
        
        imagen = document.createElement("img");
        titulo = document.createElement("h1");
        titulo.textContent = receta.titulo;
        imagen.src = `${API_URL}/uploads/${receta.codigo_imagen}`
        imagen.alt = receta.titulo;
        mainDiv.appendChild(titulo);
        mainDiv.appendChild(imagen);
        
        containerRecetas.appendChild(mainDiv);
    });
})
.catch(error => {
    console.error("Hubo un problema al obtener las recetas:", error);
})