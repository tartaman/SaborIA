const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const confirmationObject = new ConfirmationWindow("¿Está seguro de esta acción?", "Esta acción NO puede revertirse.", () => console.log("sisis"));

function deleteReceta(id_receta){
    fetch(`${API_URL}/delete-receta`, {
        method: `POST`,
        headers: {
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({'id_receta':id_receta})
    }).
    then(response => response.json()).
    then(data => {
        if(data.status == 200){

            window.location.href = 'index.html'
        }
    });
}

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
    document.querySelector('#title').innerHTML = data[0].titulo

    const pasos = data[0].pasos.split('\n')  
    const ol = document.createElement("ol");
    pasos.forEach(paso => {
        const li = document.createElement("li");
        li.innerHTML = paso;
        ol.appendChild(li);
    });

    document.querySelector('.preparation-steps').appendChild(ol);

    document.querySelector('#image').src = `${API_URL}/uploads/${data[0].codigo_imagen}`
    const details = document.querySelectorAll('.recipe-detail');
    
    const textos = [`Tiempo de preparación: ${data[0].tiempo_preparacion} minutos`, `Nivel: ${data[0].dificultad}`,
     `Por: ${data[0].creador}`]

    for (let i = 0; i < details.length; i++) {
        const detail = document.createElement('p');
        detail.innerHTML = textos[i];
        details[i].appendChild(detail);
    }

    const divIngredientes = document.querySelector('#ingredients div')
    
    data[0].ingredientes.forEach(ingrediente => {
        const ingredienteDiv = document.createElement('div');
        ingredienteDiv.classList.add('ingredient-div');
        ingredienteDiv.innerHTML = `
            <div>
                <img src="${ingrediente.codigo_imagen}">
            <p>${ingrediente.nombre}</p>
            </div>
            <div>
                <p>${ingrediente.cantidad}</p>
                <b>${ingrediente.simbolo_ingrediente}</b>
            </div>
        `;
        divIngredientes.appendChild(ingredienteDiv);
    });
});


document.body.appendChild(confirmationObject.pantallaConf)

document.querySelector('.button-eliminar').addEventListener('click', () => confirmationObject.show())