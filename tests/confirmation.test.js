const ConfirmationWindow = require("../scripts/confirmationScreen");

describe('ConfirmationWindow', () => {
    let confirmationWindow;

    beforeEach(() => {
        // Limpia el DOM antes de cada prueba
        document.body.innerHTML = '';
    });

    test('ConfirmationWindow debe colocar en el h2, el título que se le de y en la etiqueta p la descripción', () => {
        confirmationWindow = new ConfirmationWindow('Título de prueba', 'Texto de prueba');
        document.body.appendChild(confirmationWindow.pantallaConf);

        const titleElement = confirmationWindow.pantallaConf.querySelector('h2');
        const textElement = confirmationWindow.pantallaConf.querySelector('p');

        expect(titleElement.textContent).toBe('Título de prueba');
        expect(textElement.textContent).toBe('Texto de prueba');
    });

    test('Si no se le da una descripción, la etiqueta p no debe aparecer', () => {
        confirmationWindow = new ConfirmationWindow('Título sin texto');
        document.body.appendChild(confirmationWindow.pantallaConf);

        const titleElement = confirmationWindow.pantallaConf.querySelector('h2');
        const textElement = confirmationWindow.pantallaConf.querySelector('p');

        expect(titleElement.textContent).toBe('Título sin texto');
        expect(textElement).toBeNull(); // El elemento <p> no debería existir
    });

    test('Si se proporciona un event, este se debe asociar al botón de la pantalla de confirmación', () => {
        const mockEvent = jest.fn();
        confirmationWindow = new ConfirmationWindow('Título', 'Texto', mockEvent);
        document.body.appendChild(confirmationWindow.pantallaConf);

        const acceptButton = confirmationWindow.pantallaConf.querySelector('#accept');
        acceptButton.click();

        expect(mockEvent).toHaveBeenCalledTimes(1); 
    });

    test('Al usar la función close(), la clase invisible debe agregarse', () => {
        confirmationWindow = new ConfirmationWindow('Título', 'Texto');
        document.body.appendChild(confirmationWindow.pantallaConf);

        confirmationWindow.hide();
        expect(confirmationWindow.pantallaConf.classList.contains('invisible')).toBe(true);
    });

    test('Al apretar el botón de close, se debe agregar la clase invisible', () => {
        confirmationWindow = new ConfirmationWindow('Título', 'Texto');
        document.body.appendChild(confirmationWindow.pantallaConf);

        confirmationWindow.show(); 
        const closeButton = confirmationWindow.pantallaConf.querySelector('#close');
        closeButton.click();

        expect(confirmationWindow.pantallaConf.classList.contains('invisible')).toBe(true);
    });

    test('Al usar la función show(), la clase invisible debe quitarse', () => {
        confirmationWindow = new ConfirmationWindow('Título', 'Texto');
        document.body.appendChild(confirmationWindow.pantallaConf);

        confirmationWindow.show();
        expect(confirmationWindow.pantallaConf.classList.contains('invisible')).toBe(false);
    });
});