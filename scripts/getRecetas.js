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
        //div que contiene la imagen, titulo, etc
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("receta");
        //imagen de la receta
        let imagen = document.createElement("img");
        imagen.src = `${API_URL}/uploads/${receta.codigo_imagen}`;
        imagen.alt = receta.titulo;
        //titulo de la receta
        let titulo = document.createElement("h1");
        titulo.textContent = receta.titulo;

        //contenedor de la duracion y dificultad
        let dificultadReceta = document.createElement("div");
        dificultadReceta.classList.add("dificultad-receta-container");
        //duracion de la receta
        let duracion = document.createElement("p");
        duracion.innerHTML = `<i class="fa-solid fa-clock"></i> ${receta.tiempo_preparacion} min`;
        //dificultad de la receta
        let dificultad = document.createElement("p");
        dificultad.innerHTML = `<i class="fa-solid fa-gauge"></i> ${receta.nombre}`;

        //meter dificultad y duracion en el contenedor
        dificultadReceta.appendChild(duracion);
        dificultadReceta.appendChild(dificultad);
       
        //meter titulo e imagen en el main div
        mainDiv.appendChild(titulo);
        mainDiv.appendChild(imagen);
         //meter dificultadReceta en el mainDiv
         mainDiv.appendChild(dificultadReceta);
         //añadirle al contenedor un listener de click en el que mande al usuario a otra ventana
         mainDiv.addEventListener("click", () => {
            const url = `detalle.html?IDR=${receta.id_receta}`; // Aquí utilizas el ID o un identificador único
            window.location.href = url;
        });
        
        containerRecetas.appendChild(mainDiv);
    });
})
.catch(error => {
    console.error("Hubo un problema al obtener las recetas:", error);
})