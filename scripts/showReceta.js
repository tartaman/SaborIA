const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const confirmationObject = new ConfirmationWindow("¿Está seguro de esta acción?", "Esta acción NO puede revertirse.", () => deleteReceta(id_receta));
const loadingScreen = new LoadingScreen();



function deleteReceta(id_receta){
    confirmationObject.hide()
    loadingScreen.changeMotive("loading", "Eliminando receta...");
    loadingScreen.toggleLoadingScreen();
    
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
        if(data.message.includes("200")){
            loadingScreen.changeMotive("success", "Receta eliminada con éxito.");
            loadingScreen.loadingScreen.querySelector('button').addEventListener('click', () => document.location.href = `Receta.html`)
        }
        else{
            loadingScreen.changeMotive("error", "Hubo un error al borrar la receta, por favor, intente de nuevo.");
            loadingScreen.loadingScreen.querySelector('button').removeEventListener('click', () => document.location.href = `Receta.html`)
        }
    });
    
    
}

function insertButtons(globalRecipe){
    console.log(globalRecipe)
    if(globalRecipe == 0){
        const buttons = document.createElement("div");
        buttons.classList.add('button-div');
        buttons.innerHTML = `
            <button class="button-verde">Editar receta</button>
            <button class="button-verde button-eliminar">Borrar receta</button>
        `;
        document.querySelector('main').appendChild(buttons)
    }
    

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
    
    insertButtons(data[0].global_recipie)
    
    document.querySelector('.button-eliminar').addEventListener('click', () => confirmationObject.show())
});


document.body.appendChild(confirmationObject.pantallaConf)


document.body.appendChild(loadingScreen.loadingScreen)

