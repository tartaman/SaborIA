// Permite el evento de arrastre en el contenedor
function allowDrop(event) {
    event.preventDefault();
}

// Establece el ID del elemento arrastrado en el evento de arrastre
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");  // Obtiene el ID del elemento arrastrado
    const draggedElement = document.getElementById(data);

    // Verifica si el contenedor no tiene ya el elemento para evitar duplicados
    if (!event.target.contains(draggedElement) && event.target == document.querySelector('#contenedor-ingredientes')) {
        event.target.appendChild(draggedElement);  // Mueve el elemento al nuevo contenedor
    }
}
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
        ingredientesData.forEach(element => {
            div = document.createElement('div');
            div.classList.add('ingrediente');
            div.innerHTML = `
                    <input type="number" id="ingrediente-${element.id_ingrediente}" name="ingrediente-${element.id_ingrediente}" value="${element.cantidad}" placeholder="${element.simbolo}">
                    <label for="ingrediente-${element.id_ingrediente}">${element.nombre}</label>
                    <button>X</button>
            `;
            document.querySelector('#contenedor-ingredientes').appendChild(div);
            gottenIds.add(element.id_ingrediente);
        })
    } catch (error) {
        console.log(error);
    }
    try {
        const ingredientes = await fetch(`${API_URL}/ingredientes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }});
        const ingredientesData = await ingredientes.json()
        ingredientesData.forEach(element => {
            if(!gottenIds.has(element.id_ingrediente)){
                div = document.createElement('div');
                div.classList.add('ingrediente');
                div.draggable = true;
                div.setAttribute('id',`${element.id_ingrediente}`)
                div.addEventListener('dragstart', (event) => drag(event));
                div.innerHTML = `
                        <input type="number" id="ingrediente-${element.id_ingrediente}" name="ingrediente-${element.id_ingrediente}" placeholder="${element.simbolo}">
                        <label for="ingrediente-${element.id_ingrediente}">${element.nombre}</label>
                        <button>X</button>
                `;
                document.querySelector('#contenedor-agregar').appendChild(div);
            }
        })
    } catch (error) {
        console.log(error);
    }

}

getIngredientsinventory()