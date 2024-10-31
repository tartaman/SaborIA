document.querySelector('#busqueda-receta').addEventListener('change', () => {
    const busqueda = document.querySelector('#busqueda-receta').value;
    const recetas = document.querySelectorAll('.receta');
    recetas.forEach(receta => {
        if (receta.querySelector('h1').textContent.toLowerCase().includes(busqueda.toLowerCase())) {
            receta.style.display = 'block';
        } else {
            receta.style.display = 'none';
        }
    });
})