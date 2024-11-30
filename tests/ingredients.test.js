const waos =  require('../scripts/search-input.js');

describe("Test de búsqueda de ingredientes", () => {
  let container, input;

  beforeEach(() => {
    // Creamos un HTML mínimo para las pruebas
    document.body.innerHTML = `
      <div id="contenedor-agregar">
        <div>
          <label>Ingrediente 1</label>
        </div>
        <div>
          <label>Ingrediente 2</label>
        </div>
        <div>
          <label>Ingrediente 3</label>
        </div>
      </div>
      <input id="ingredient-search">
    `;
    
    // Ahora que el DOM está listo, obtenemos el contenedor y el input
    container = document.querySelector("#contenedor-agregar");
    input = document.querySelector("#ingredient-search");
    
    // Verificamos si los elementos han sido correctamente seleccionados
    console.log(container); // Verificar si el contenedor está bien definido
    console.log(input); // Verificar si el input está bien definido
  });

  it('debería mostrar todos los ingredientes si el input está vacío', () => {
    // Asumimos que el input está vacío
    input.value = '';
    
    // Llamamos a la función waos para aplicar el filtro
    waos(input, container);
    
    // Verificamos que todos los elementos están visibles
    Array.from(container.children).forEach(child => {
      expect(child.style.display).toBe("flex");
    });
  });

  it('debería filtrar los ingredientes según la búsqueda', () => {
    // Establecemos un valor de búsqueda
    input.value = 'Ingrediente 1';
    
    // Llamamos a la función waos
    waos(input, container);
    
    // Verificamos que solo el ingrediente correspondiente sea visible
    expect(container.children[0].style.display).toBe("flex");
    expect(container.children[1].style.display).toBe("none");
    expect(container.children[2].style.display).toBe("none");
  });
});