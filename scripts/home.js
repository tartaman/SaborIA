async function getIngredientsFullfilled() {
    try {
        const recetasResponse = await fetch(`${API_URL}/Recetas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const recetasData = await recetasResponse.json();

        const ingredientesResponse = await fetch(`${API_URL}/ingredientes-usuario`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        const ingredientes = await ingredientesResponse.json();

        return recetasData.map(receta => {
            const coincidencias = receta.ingredientes.filter(ing => {
                const ingredienteUsuario = ingredientes.find(({ id_ingrediente }) => id_ingrediente === ing.id_ingrediente);
                return ingredienteUsuario && ingredienteUsuario.cantidad >= ing.cantidad; 
            });
            return [coincidencias.length, coincidencias, receta]; 
        });

        
    } catch (error) {
        console.error("Hubo un problema al obtener las recetas o los ingredientes:", error);
        return []; 
    }
}

async function getRecomended(){
    let rawResponse = await getIngredientsFullfilled();
    let finalResponse ={
        recommended: [],
        suggested: [],
        rest: []
    }

    rawResponse.forEach(receta => {
        let ingredientesTotales = receta[2].ingredientes.length;
        if(receta[0] >= ingredientesTotales){
            finalResponse.recommended.push(receta[2]);
        }
        else if(receta[0] >= ingredientesTotales * 0.5){
            finalResponse.suggested.push(receta[2]);
        }
        else{
            finalResponse.rest.push(receta[2]);
        }
    });
    return finalResponse;
}

function createWidget(receta){
    const recetaDiv = document.createElement('div');
    recetaDiv.classList.add("receta-container");
    recetaDiv.innerHTML = `
        <img crossorigin="anonimous" src="${API_URL}/uploads/${receta.codigo_imagen}" alt="${receta.titulo}">
        <h2>${receta.titulo}</h2>
    `;
    const button = document.createElement('button');
    button.classList.add("button-verde");
    button.textContent = "Ver más";
    recetaDiv.appendChild(button);

    button.addEventListener('click', () => {
        window.location.href = `detalle.html?IDR=${receta.id_receta}`;
    })
    return recetaDiv;
}

function createEmpty(){
    const recetaDiv = document.createElement('div');
    recetaDiv.classList.add("no-recipes");
    recetaDiv.innerHTML = `
        <img crossorigin="anonimous" src="${API_URL}/uploads/No-recipes.png">
        <h3>No hay recetas para mostrar. Intenta agregando ingredientes y recetas.</h3>
    `;
    recetaDiv.classList.add("empty-recipe");
    return recetaDiv;
}

async function showRecomended() {
    let response = await getRecomended();
    const recommended = document.getElementById('recommended');
    const suggested = document.getElementById('suggested');
    const rest = document.getElementById('rest');

    if(response.recommended.length == 0){
        recommended.appendChild(createEmpty());
    }
    response.recommended.forEach(receta => {
        let recetaDiv = createWidget(receta);
        recommended.appendChild(recetaDiv);
    });

    if(response.suggested.length == 0){
        suggested.appendChild(createEmpty());
    }
    response.suggested.forEach(receta => {
        let recetaDiv = createWidget(receta);
        suggested.appendChild(recetaDiv);
    });
    
    if(response.rest.length == 0){
        rest.appendChild(createEmpty());
    }
    let numerosAleatorios = [];
    let quantity = Math.min(response.rest.length, 6);
    while (numerosAleatorios.length != quantity){
        let numeroAleatorio = Math.floor(Math.random() * response.rest.length);
        if(!numerosAleatorios.includes(numeroAleatorio)){
            numerosAleatorios.push(numeroAleatorio);
        }
    }
    
    numerosAleatorios.forEach(numero => {
        let recetaDiv = createWidget(response.rest[numero]);
        rest.appendChild(recetaDiv);
    });
    
}

document.addEventListener('DOMContentLoaded', function() {
    showRecomended();
});
