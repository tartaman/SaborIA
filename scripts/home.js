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



document.addEventListener('DOMContentLoaded', function() {
    getRecomended();
});
