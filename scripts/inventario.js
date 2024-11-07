async function getIngredientsinventory () {
    gottenIds = new Set();
    try {
        const ingredientesResponse =await fetch(`${API_URL}/ingredients-single`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }});
        const ingredientesData = await ingredientesResponse.json()
        console.log(ingredientesData)
        botonguardar = document.querySelector('#button-guardarcambios');
        ingredientesData.forEach(element => {
            div = document.createElement('div');
            div.classList.add('ingrediente');
            div.innerHTML = `
                    <input type="number" id="ingrediente-${element.id_ingrediente}" name="ingrediente-${element.id_ingrediente}" value="${element.cantidad}" placeholder="${element.simbolo}">
                    <label for="ingrediente-${element.id_ingrediente}">${element.nombre}</label>
                    <button>X</button>
            `;
            document.querySelector('#contenedor-ingredientes').insertBefore(div, botonguardar);
            gottenIds.add(element.id_ingrediente);
        })
    } catch (error) {
        console.log(error);
    }
    try {
        const ingredientes = await fetch(`${API_URL}/ingredients`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }});
        const ingredientesData = await ingredientes.json()
        ingredientesData.forEach(element => {
            if(!gottenIds.has(element.id_ingrediente)){
                div = document.createElement('div');
                div.classList.add('ingrediente');
                div.innerHTML = `
                        <input type="number" id="ingrediente-${element.id_ingrediente}" name="ingrediente-${element.id_ingrediente}" placeholder="${element.simbolo}">
                        <label for="ingrediente-${element.id_ingrediente}">${element.nombre}</label>
                        <button>X</button>
                `;
                document.querySelector('#contenedor-ingredientes').insertBefore(div, botonguardar);
            }
        })
    }

}

getIngredientsinventory()