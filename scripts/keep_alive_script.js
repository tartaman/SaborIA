
function makeRequest() {
    // Realizamos la petición a la API
    fetch(`${API_URL}/dificultades`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta de la API`);
        }
        return response.json(); // Parseamos la respuesta a JSON
      })
      .then(data => {
        console.log(`Datos recibidos de la API:`, data);
      })
      .catch(error => {
        console.error(`Error al hacer la petición:`, error);
      });
  }

  setInterval(makeRequest, 5000)