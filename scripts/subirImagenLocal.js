const uploadDiv = document.querySelector('#uploadDiv');
const fileInput = document.querySelector('#fileInput');
const target = document.querySelector("#targetImageDiv");

// Al hacer clic en el div, se activa el input de tipo file
uploadDiv.addEventListener('click', () => {
    fileInput.click(); // Simular clic en el input de archivo
});

// Manejar la selección de archivo
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
        const reader = new FileReader();
        
        // Leer el archivo y mostrarlo en el div
        reader.onload = function(e) {
            target.style.backgroundImage = `url(${e.target.result})`;
        };

        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
});