// Seleccionamos todos los inputs y les agregamos un event listener
document.querySelectorAll("input").forEach((input) => {
    input.addEventListener('input', function() {
        // Permitir letras, números, espacios y el punto (.)
        this.value = this.value.replace(/[^a-zA-Z0-9 .@]/g, '');
    });
});
document.querySelector("#pasos").addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-Z0-9 .@]/g, '');
})