document.querySelector("#login").addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
        username: document.querySelector("#usuario").value,
        pass: document.querySelector("#contrasena").value
    }
    
})