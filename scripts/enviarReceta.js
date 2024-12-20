let loadingScreen;

function clearForms() {
    document.querySelectorAll('input').forEach(input => {
        input.value = ''; // Limpia el valor del input
    });
    document.querySelector("#pasos").value = '';
    const targetImageDiv = document.querySelector('#targetImageDiv');
    
    if (targetImageDiv) {
        targetImageDiv.style.backgroundImage = "url('./Images/Add_image_placeholder.png')"; // Establece la imagen de fondo 
    }
    document.querySelector("#ingredients-list").innerHTML = "";
}
// Capturamos el envío del formulario
document.querySelector(`#dificultadForm`).addEventListener(`submit`, function(event) {
    event.preventDefault(); // Evitamos el comportamiento por defecto del formulario
    loadingScreen.changeMotive();
    loadingScreen.toggleLoadingScreen();
    // Obtenemos los datos del formulario
    const formData = {
        nombre: document.querySelector(`#nombre`).value,
        tiempo: document.querySelector(`#tiempo`).value,
        dificultad: document.querySelector(`#dificultades`).value,
        pasos: document.querySelector(`#pasos`).value,
        porciones: document.querySelector(`#porciones`).value,
    };

    const imageFile = document.querySelector('#fileInput').files[0];
    if (!imageFile) {
        loadingScreen.changeMotive("error", "Por favor, seleccione una imagen");
        return;
    }

    console.log(formData);
    // Hacemos una solicitud POST con fetch al backend
    fetch(`${API_URL}/agregar-receta`, {
        method: `POST`,
        headers: {
            'Content-Type': `application/json`, // Indicamos que estamos enviando JSON
            'Authorization': `Bearer ${token}` // Incluimos el token en los headers
        },
        body: JSON.stringify(formData) // Convertimos los datos del formulario a JSON   
    })
    .then(response => response.json()) // Procesamos la respuesta como JSON
    .then(data => {
        if (data.message === `Token expirado. Por favor, inicia sesión de nuevo.`) {
            // Si el token ha expirado, redirigimos al inicio de sesión
            console.log(`Token expirado, redirigiendo al inicio de sesión...`);
            localStorage.removeItem(`token`); // Limpiamos el token del localStorage
            window.location.href = `../Iniciarsesion.html`; // Redirigimos al login
        } else if (data.message === `Token inválido.`) {
            console.error(`Token inválido, acción denegada.`);
            window.location.href = `./Iniciarsesion.html`;
            return;
        } else if (data.message == `No tiene permitido crear receta`){
            console.error(data.message)
            alert(`No se pudo crear la receta`)
            loadingScreen.changeMotive("error", "Hubo un error al agregar la receta");
            return;
        }

        let msj = "";
        console.log(data.message);
       
        if(data.message.includes("40")){

            if (data.message == "Error"){
                msj = "Hubo un error al agregar la receta";
            }
            else if (data.message.includes("ER_DUP_ENTRY")){
                msj ="El nombre de la receta ya existe"
            }
            else if (data.message.includes("Ha alcanzado el límite de recetas permitidas")){
                msj = data.message
            }

            else if(data.message.includes("Todos los campos son obligatorios")){
                msj = "Todos los campos son obligatorios";
            }
                
            loadingScreen.changeMotive("error", msj);
            return Promise.reject(data.message);
        }
        //debió llegar hasta aqui bien por lo que solo checamos si si se pudo subir
        selectedIngredientsObject.forEach(ingredient => {
            ingredient.recetaId = data.recetaId;
            console.log(ingredient)
            fetch(`${API_URL}/ingredientes-receta`, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`, // Indicamos que estamos enviando JSON
                    'Authorization': `Bearer ${token}` // Incluimos el token en los headers
                },
                //por cada elemento del arreglo de ingredientes, se envia al backend
                body: JSON.stringify(ingredient)
            }).then(response => response.json())
            .then(data => {
                console.log(`Ingrediente agregado:`, data);
            
            })
            .catch(error => console.error(`Error al agregar el ingrediente:`, error));
        });
        // Subir la imagen aquí
        const recetaId = data.recetaId; // Obtener el ID de la receta
        const recetaNombre = formData.nombre.replace(/\s+/g, '_'); // Reemplaza espacios por guiones bajos
        const imageFormData = new FormData();
        const imageFile = document.querySelector('#fileInput').files[0];

        console.log('Archivo seleccionado:', imageFile); // Asegurarnos de tener un input de tipo file
        imageFormData.append('image', imageFile);
        imageFormData.append('recetaNombre', recetaNombre); // Pasar el nombre de la receta
        imageFormData.append('recetaId', recetaId); // Pasar el ID de la receta
        
        return fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // Incluimos el token en los headers
                    },
            body: imageFormData
        });
                
    })
    .then(response => response.json())
    .then(data => {
        loadingScreen.changeMotive("success", "Receta agregada con éxito");
    })
    .catch(error => console.error(`Error al agregar la receta o subir la imagen:`, error));
});


document.addEventListener('DOMContentLoaded', function() {
    loadingScreen =  new LoadingScreen();
    document.body.appendChild(loadingScreen.loadingScreen);

});

