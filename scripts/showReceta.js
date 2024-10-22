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
});