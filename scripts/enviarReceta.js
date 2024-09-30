// Capturamos el envío del formulario
function clearForms() {
    document.querySelectorAll(`input`).forEach(() => {
        this.value = ``
    });
    document.querySelector(`#targetImageDiv`).computedStyleMap.backgroundImage = "Images/Add_image_placeholder"
}
// Capturamos el envío del formulario
document.querySelector(`#dificultadForm`).addEventListener(`submit`, function(event) {
    event.preventDefault(); // Evitamos el comportamiento por defecto del formulario

    // Obtenemos los datos del formulario
    const formData = {
        nombre: document.querySelector(`#nombre`).value,
        tiempo: document.querySelector(`#tiempo`).value,
        dificultad: document.querySelector(`#dificultades`).value,
        pasos: document.querySelector(`#pasos`).value,
        porciones: document.querySelector(`#porciones`).value,
    };

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
        } else {
            console.log(`Receta agregada con éxito:`, data);
            clearForms();

            // Subir la imagen aquí
            const recetaId = data.recetaId; // Obtener el ID de la receta
            const recetaNombre = formData.nombre.replace(/\s+/g, '_'); // Reemplaza espacios por guiones bajos

            const imageFormData = new FormData();
            const imageFile = document.querySelector('#fileInput').files[0]; // Asegúrate de tener un input de tipo file
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

        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Imagen subida:`, data);
            
    })
    .catch(error => console.error(`Error al agregar la receta o subir la imagen:`, error));
});
