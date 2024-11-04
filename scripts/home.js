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
        <img src="${API_URL}/uploads/${receta.codigo_imagen}" alt="${receta.titulo}">
        <h2>${receta.titulo}</h2>
        <button class="button-verde">Ver más</button>
    `
    return recetaDiv;
}

async function showRecomended() {
    let response = await getRecomended();
    const recommended = document.getElementById('recommended');
    const suggested = document.getElementById('suggested');
    const rest = document.getElementById('rest');

    response.recommended.forEach(receta => {
        let recetaDiv = createWidget(receta);
        recommended.appendChild(recetaDiv);
    });

    response.suggested.forEach(receta => {
        let recetaDiv = createWidget(receta);
        suggested.appendChild(recetaDiv);
    });
    
    let numerosAleatorios = [];
    while (numerosAleatorios.length != 6){
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
