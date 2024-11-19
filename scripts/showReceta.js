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

    const pasos = data[0].pasos.split('\n')  
    const ol = document.createElement("ul");
    pasos.forEach(paso => {
        const li = document.createElement("li");
        li.innerHTML = paso;
        ol.appendChild(li);
    });
    

    });

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
        console.log(ingrediente)
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

