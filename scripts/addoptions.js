fetch("https://saboria.onrender.com/dificultades")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al obtener las dificultades");
    }
    return response.json(); // Parseamos la respuesta como JSON
  })
  .then(data => {
    console.log("Dificultades obtenidas:", data);
    const combo = document.querySelector("#dificultades");
    
    // Rellenar el combo con las dificultades
    data.forEach(dificultad => {
      const option = document.createElement("option");
      option.value = dificultad.id_dificultad; // Asignamos el id como valor
      option.textContent = dificultad.nombre;  // Asignamos el nombre como texto
      combo.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Hubo un problema al obtener las dificultades:", error);
  });
