document.querySelector('#singupform').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitamos el comportamiento por defecto del formulario
    // Obtenemos los datos del formulario
    const formData = {
        nombre: document.querySelector('#nombre').value,
        apat: document.querySelector('#apellidopat').value,
        amat: document.querySelector('#apellidomat').value,
        correo: document.querySelector('#email').value,
        username: document.querySelector('#usuario').value,
        pass: document.querySelector('#contrasena').value
    };
    console.log(formData)

    // Hacemos una solicitud POST con fetch al backend
    fetch("https://saboria.onrender.com/addEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify(formData) // Convertimos los datos del formulario a JSON   
    })
    .then(response => response.json()) // Procesamos la respuesta como JSON
    .then(data => {
        console.log("email agregado con éxito:", data);
        document.querySelector('#nombre').textContent = ""
        document.querySelector('#apellidopat').textContent = ""
        document.querySelector('#apellidomat').textContent = ""
        document.querySelector('#email').textContent = ""
        document.querySelector('#usuario').textContent = ""
        document.querySelector('#contrasena').textContent = ""
    })
    .catch(error => console.error("Error al agregar email: ", error));
});