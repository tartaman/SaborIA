
const API_URL = require("../scripts/config");
const token = localStorage.getItem('token');

const { deleteReceta, insertButtons } = require('../scripts/showReceta');

test('deleteReceta envía la solicitud correcta', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ message: "200" })
        })
    );

    global.confirmationObject = {
        hide: jest.fn()
    }
    global.loadingScreen = {
        changeMotive: jest.fn(),
        toggleLoadingScreen: jest.fn()
    }
    deleteReceta(123, global.confirmationObject, global.loadingScreen);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/delete-receta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_receta: 123 })
    });
});

test('Al confirmar la eliminación, se debe llamar a la función hide de la pantalla de confirmación', ()=>{
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ message: "200" })
        })
    );
    global.confirmationObject = {
        hide: jest.fn()
    }
    global.loadingScreen = {
        changeMotive: jest.fn(),
        toggleLoadingScreen: jest.fn()
    }
    deleteReceta(123, global.confirmationObject, global.loadingScreen);
    expect( global.confirmationObject.hide).toHaveBeenCalled();
})

test ('Al recibir un código de 200 (el fetch estuvo bien hecho), se cambia el motivo de la pantalla de espera a success', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ message: "200" })
        })
    );
    global.confirmationObject = {
        hide: jest.fn()
    }
    global.loadingScreen = {
        changeMotive: jest.fn(),
        toggleLoadingScreen: jest.fn()
    }
    await deleteReceta(123, global.confirmationObject, global.loadingScreen);
    expect( global.loadingScreen.changeMotive).toHaveBeenNthCalledWith(2, "success", "Receta eliminada con éxito.");

});

test ('Al recibir otro código diferente de 200 (significado que hubo errores), se cambia el motivo de la pantalla de espera a error', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ message: "500" })
        })
    );
    global.confirmationObject = {
        hide: jest.fn()
    }
    global.loadingScreen = {
        changeMotive: jest.fn(),
        toggleLoadingScreen: jest.fn()
    }
    await deleteReceta(123, global.confirmationObject, global.loadingScreen);
    expect( global.loadingScreen.changeMotive).toHaveBeenNthCalledWith(2, "error", "Hubo un error al borrar la receta, por favor, intente de nuevo.");

});

test('insertButtons no agrega botones si la receta no es del usuario, si no que es global', () => {
    document.body.innerHTML = '<main></main>';
    insertButtons(1);
    expect(document.querySelector('.button-div')).toBeNull();
});


