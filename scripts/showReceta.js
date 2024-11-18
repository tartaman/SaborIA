const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// Obtener los valores de los parámetros
const id_receta = urlParams.get('IDR');
fetch(`${API_URL}/receta`, {
    method: `POST`,
    headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({'id_receta':id_receta})
}).
then(response => response.json()).
then(data => {
    console.log(data)
    document.querySelector('#title').innerHTML = data[0].titulo
    document.querySelector('#pasos').innerHTML = data[0].pasos.replace(/\n/g, '<br>')
    document.querySelector('#image').src = `${API_URL}/uploads/${data[0].codigo_imagen}`
    document.querySelector('#product-info').innerHTML = `
                                                        <h3>Por: ${data[0].creador}</h3>
                                                        <h3>Dificultad: ${data[0].dificultad}</h3>
                                                        <h3>Tiempo: ${data[0].tiempo_preparacion} minutos</h3>
                                                        `
});