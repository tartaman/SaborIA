const datalist = document.querySelector('#ingredients-list');
const input = document.querySelector("#ingredient-input");
const ingredientsContainer = document.querySelector("#ingredients");
let selectedIngredients = new Set();  // Set para almacenar los ingredientes ya agregados
let selectedIngredientsObject = []
// Función para crear el div del ingrediente seleccionado
function createIngredientDiv(ingredient) {
    const div = document.createElement("div");
    div.classList.add("ingredient-item");

    // Crear la imagen del ingrediente
    const img = document.createElement("img");
    img.src = ingredient.codigo_imagen;
    img.alt = ingredient.nombre;
    img.classList.add("ingredient-image");

    // Crear el título con el nombre del ingrediente
    const title = document.createElement("span");
    title.innerText = ingredient.nombre;
    title.classList.add("ingredient-title");

    // Crear un input para la cantidad (contador)
    const inputNumber = document.createElement("input");
    inputNumber.type = "number";
    inputNumber.min = "1";
    inputNumber.value = "1";
    inputNumber.classList.add("ingredient-count");

    //prevenir el comportamiento default de el input al hacer enter
    inputNumber.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
    //añadir un event listener al imput para cuando cambie
    inputNumber.addEventListener("change", function() {
        console.log(`Cantidad cambiada para ${ingredient.nombre}: ${inputNumber.value}`);
        selectedIngredientsObject.find(item => item.nombre === ingredient.nombre).cantidad = parseInt(inputNumber.value);
    });
    //Poner la unidad debajo del input
    const unidad = document.createElement("span");
    unidad.innerText = ingredient.simbolo;
    unidad.classList.add("ingredient-unidad");
    //poner un boton para quitarlos
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function() {
        div.remove();
        selectedIngredients.delete(ingredient.nombre);
        selectedIngredientsObject = selectedIngredientsObject.filter(item => item.nombre !== ingredient.nombre);
    });
    // Agregar al div los elementos
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(inputNumber);
    div.appendChild(unidad);
    div.appendChild(deleteButton);

    // Agregar el div al contenedor de ingredientes
    ingredientsContainer.appendChild(div);
}
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        input.dispatchEvent(new Event("change"));
    }
});
// Evento para capturar cuando se presiona "Enter"
input.addEventListener("change", function(event) {
        event.preventDefault();

        // Encontramos el elemento que coincida con el de la lista
        const selectedOption = Array.from(datalist.options).find(option => option.value === input.value);

        if (selectedOption) {
            const selectedIngredient = ingredients.find(ing => ing.nombre === input.value);

            // Verificar si el ingrediente ya fue agregado
            if (selectedIngredients.has(selectedIngredient.nombre)) {
                alert("Este ingrediente ya ha sido agregado.");
                input.value = ''; // Limpiar el input
                return;
            } else {
                // Agregar el ingrediente seleccionado al contenedor
                createIngredientDiv(selectedIngredient);
                // Agregar el ingrediente al Set de ingredientes seleccionados
                selectedIngredients.add(selectedIngredient.nombre);
                selectedIngredientsObject.push(selectedIngredient);
                selectedIngredientsObject[selectedIngredientsObject.length - 1].cantidad = 1;
                // Limpiar el campo de texto
                input.value = '';
            }
            console.log(selectedIngredientsObject);


        } else {
            console.log("Ingrediente no encontrado");
        }
});

// Fetch para obtener los ingredientes de la API
let ingredients = [];
fetch(`${API_URL}/ingredientes`)
    .then(response => response.json())
    .then(data => {
        ingredients = data;
        console.log("Ingredientes obtenidos:", ingredients);

        // Agregar opciones al datalist
        data.forEach(ingrediente => {
            const ingredienteOpt = document.createElement('option');
            ingredienteOpt.value = ingrediente.nombre;
            ingredienteOpt.innerHTML = ingrediente.id_ingrediente;
            datalist.appendChild(ingredienteOpt);
        });
    })
    .catch(error => {
        console.error("Hubo un problema al obtener los ingredientes:", error);
    });
