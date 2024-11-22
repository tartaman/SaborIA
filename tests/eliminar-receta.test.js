global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ message: "200" })
    })
);

const deleteReceta = require('../scripts/showReceta');

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