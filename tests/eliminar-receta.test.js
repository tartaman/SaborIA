
const API_URL = require("../scripts/config");
const token = localStorage.getItem('token');

const { deleteReceta, insertButtons } = require('../scripts/showReceta');

test('deleteReceta envía la solicitud correcta', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ message: "200" })
        })
    );
    deleteReceta(123);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/delete-receta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_receta: 123 })
    });
});

test('insertButtons no agrega botones si la receta no es del usuario, si no que es global', () => {
    document.body.innerHTML = '<main></main>';
    insertButtons(1);
    expect(document.querySelector('.button-div')).toBeNull();
});


