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
            div.setAttribute('new', false);
            div.innerHTML = `
                    <input type="number" min="0" id="${element.id_ingrediente}" new="false" class="form-input input" name=ingrediente-${element.id_ingrediente}" value="${element.cantidad}" placeholder="${element.simbolo}">
                    <label for="${element.id_ingrediente}">${element.nombre}</label>
                    <button class="elim-button" id="elim-button">X</button>
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
                        <img src="${API_URL}/uploads/${element.codigo_imagen}" alt=""
                        <label for="ingrediente-${element.id_ingrediente}">${element.nombre}</label>
                        <div class="gramaje">
                            <p>${element.simbolo_ingrediente}:</p>
                            <input type="number" id="${element.id_ingrediente}" class="form-input input" name="ingrediente-${element.id_ingrediente}" new="true" placeholder="${element.simbolo}">
                        </div>
                        <button class="elim-button">X</button>
                `;
                document.querySelector('#contenedor-agregar').appendChild(div);
            }
        })
    } catch (error) {
        console.log(error);
    }

    //botón para eliminar cosas
    document.querySelectorAll('#elim-button').forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            myelem = event.target.parentElement
            console.log(myelem)
            document.querySelector('#contenedor-agregar').appendChild(myelem);
            myelem.querySelector('input').setAttribute('new',true);
            myelem.querySelector('input').value = "";
            myelem.replaceWith(myelem.cloneNode(true));
            fetch(`${API_URL}/borrarInventario`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: myelem.querySelector('input').id})
            })

        })
    })
}
getIngredientsinventory()
function addIngredients() {
    boton = document.querySelector('#button-guardarcambios');
    boton.addEventListener('click', async () => {
        const ingredientes = document.querySelectorAll('#contenedor-ingredientes .ingrediente input');
        const ingredientesData = [];
        ingredientes.forEach(element => {
            const id = element.id;
            const cantidad = element.value;
            const nuevo = element.getAttribute("new") == "true" ? true : false;
            ingredientesData.push({id, cantidad, nuevo});
        });
        try {
            ingredientesData.forEach(e => {
                console.log(e.id, e.cantidad, e.nuevo)
            })
            const response = await fetch(`${API_URL}/editIngredients`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredientesData)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    })
}

addIngredients();