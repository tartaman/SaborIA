const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
// Obtener los valores de los parámetros
const id_receta = urlParams.get('IDR')
async function showandeditData() {
    const Response = await fetch(`${API_URL}/receta`, {
        method: `POST`,
        headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id_receta: id_receta })
    })

    const data = await Response.json()
    console.log(data)
    document.querySelector('#title').innerHTML = data[0].titulo
    const pasos = data[0].pasos.split('\n')
    const ol = document.createElement('ol')
    pasos.forEach(paso => {
        const li = document.createElement('li')
        li.innerHTML = paso
        li.classList.add('editable')
        ol.appendChild(li)
    })

    document.querySelector('.preparation-steps').appendChild(ol)
    document.querySelector(
        '#image'
    ).src = `${API_URL}/uploads/${data[0].codigo_imagen}`
    const details = document.querySelectorAll('.recipe-detail')
    const textos = [
        `${data[0].tiempo_preparacion} minutos`,
        `${data[0].dificultad}`,
        `${data[0].creador}`
    ]
    for (let i = 0; i < details.length; i++) {
        const detail = document.createElement('p')
        detail.innerHTML = textos[i]
        if (i == 0) {
            detail.classList.add('editable')
        }
        if (i == 1){
            detail.classList.add('editabledif')
        }
        details[i].appendChild(detail)
    }
    const divIngredientes = document.querySelector('#ingredients div')
    data[0].ingredientes.forEach(ingrediente => {
        const ingredienteDiv = document.createElement('div')
        ingredienteDiv.classList.add('ingredient-div')
        if (data[0].global_recipie == 0) {
            ingredienteDiv.innerHTML = `
                <div>
                    <img src="${ingrediente.codigo_imagen}">
                <p>${ingrediente.nombre}</p>
                </div>
                <div>
                    <p>${ingrediente.cantidad}</p>
                    <b>${ingrediente.simbolo_ingrediente}</b>
                    <button class="button" id="ingredient-delete-button">X</button>
                </div>
            `
        } else {
            ingredienteDiv.innerHTML =
             `
                <div>
                    <img src="${ingrediente.codigo_imagen}">
                <p>${ingrediente.nombre}</p>
                </div>
                <div>
                    <p>${ingrediente.cantidad}</p>
                    <b>${ingrediente.simbolo_ingrediente}</b>
                </div>
            `
        }
        divIngredientes.appendChild(ingredienteDiv)
    })

    if (data[0].global_recipie == 0) {
            
        
        //poder editar la receta
        document.querySelectorAll('.editable').forEach(element => {
            element.addEventListener('click', function () {
                // Crear el input para edición
                const input = document.createElement('input')
                input.type = 'text'
                input.value = this.textContent // Rellenar el input con el texto actual
                input.style.position = 'absolute'

                // Obtener las coordenadas del elemento para posicionar el input
                const rect = this.getBoundingClientRect()
                input.style.left = `${rect.left}px`
                input.style.top = `${rect.bottom + window.scrollY}px`
                input.style.width = `${rect.width}px`
                // Agregar el input al documento
                document.body.appendChild(input)
                input.focus()

                // Cuando el usuario presione Enter
                input.addEventListener('keydown', e => {
                    if (e.key === 'Enter') {
                        this.textContent = input.value // Actualizar el texto del elemento
                        document.body.removeChild(input) // Eliminar el input
                    }
                })

                // Cuando pierda el foco, eliminar el input
                input.addEventListener('blur', () => {
                    document.body.removeChild(input)
                })
            })
        })
        comboEdits();
        
    }
    deleteIngredient();
}
showandeditData();

async function comboEdits() {
    const dificultadesResponse = await fetch(`${API_URL}/dificultades`)
    const dificultadesData = await dificultadesResponse.json()
    document.querySelectorAll('.editabledif').forEach(element => {
        element.addEventListener('click', function () {
            // Crear el select para la combobox
            const select = document.createElement('select');
            
            const opciones = [];
            dificultadesData.forEach(dificultad => {
                opciones.push(dificultad.nombre);
            });
            // Añadir opciones al select
            opciones.forEach(opcion => {
                const optionElement = document.createElement('option');
                optionElement.value = opcion;
                optionElement.textContent = opcion;
                select.appendChild(optionElement);
            });
    
            // Crear una opción vacía al inicio (ninguna selección por defecto)
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Seleccione una opción';
            placeholder.selected = true;
            placeholder.disabled = true;
            select.insertBefore(placeholder, select.firstChild);
    
            // Posicionar el select cerca del elemento
            const rect = this.getBoundingClientRect();
            select.style.position = 'absolute';
            select.style.left = `${rect.left}px`;
            select.style.top = `${rect.bottom + window.scrollY}px`;
    
            // Agregar el select al documento
            document.body.appendChild(select);
            select.focus();
    
            // Manejar el cambio de valor
            select.addEventListener('change', () => {
                if (select.value) { // Si selecciona una opción válida
                    this.textContent = select.value;
                }
                document.body.removeChild(select); // Eliminar el select
            });
    
            // Eliminar el select si pierde el foco
            select.addEventListener('blur', () => {
                document.body.removeChild(select);
            });
        });
    });
    
}   
async function deleteIngredient() {
    const ingredientes = document.querySelectorAll('.ingredient-div')
    ingredientes.forEach(ingrediente => {
        const button = ingrediente.querySelector('#ingredient-delete-button')
        button.addEventListener('click', async () => {
            const id_ingrediente_response = await fetch(`${API_URL}/ingredientes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const id_ingrediente_data = await id_ingrediente_response.json()
            let id_ingrediente = -1
            id_ingrediente_data.forEach(ingredienteObject => {
                if (ingredienteObject.nombre == ingrediente.querySelector('p').textContent) {
                    id_ingrediente = ingredienteObject.id_ingrediente
                }
            })

            const response = await fetch(`${API_URL}/delete-ingrediente-receta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id_receta: id_receta, id_ingrediente: id_ingrediente })
            })
            const data = await response.json()
            if (data.message == 'Ingrediente borrado correctamente') {
                ingrediente.remove()
            }
        })
    })
}