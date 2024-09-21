// Capturamos el envío del formulario
document.querySelector('#dificultadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitamos el comportamiento por defecto del formulario

    // Obtenemos los datos del formulario
    const formData = {
        nombre: document.querySelector('#nombre').value,
        tiempo: document.querySelector('#tiempo').value,
        difficultad: document.querySelector('#dificultades').value,
        pasos: document.querySelector('#pasos').value,
        porciones: document.querySelector('#porciones').value
    };
    console.log(formData)

    // Hacemos una solicitud POST con fetch al backend
    fetch("https://saboria.onrender.com/agregar-receta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify(formData) // Convertimos los datos del formulario a JSON   
    })
    .then(response => response.json()) // Procesamos la respuesta como JSON
    .then(data => {
        console.log("Dificultad agregada con éxito:", data);
    })
    .catch(error => console.error("Error al agregar la dificultad:", error));
});