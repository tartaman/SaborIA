const uploadDiv = document.querySelector('#uploadDiv');
const fileInput = document.querySelector('#fileInput');
const target = document.querySelector("#targetImageDiv");
uploadDiv.addEventListener('click', () => {
    fileInput.click(); // Simular clic en el input de archivo
});
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    console.log(file)
    if (file) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        // Validar tipo de imagen
        if (!validImageTypes.includes(file.type)) {
            alert('Por favor, selecciona una imagen válida (JPG, PNG, GIF).');
            return;
        }

        // Validar tamaño de imagen
        if (file.size > maxSizeInBytes) {
            alert('La imagen no debe superar los 5MB.');
            return;
        }

        const reader = new FileReader();
        
        // Leer el archivo y mostrarlo en el div
        reader.onload = function(e) {
            target.style.backgroundImage = `url(${e.target.result.toString()})`;
        };

        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
});
