function createLoading(){
    let loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div class="centro-pantalla">
            <img src="Images/loading.gif" alt="Loading" >
            <h2>Por favor espere</h2>
            <button class='button-verde'>Cerrar</button>
        </div>
    `;
    loadingScreen.classList.add('pantalla-carga');
    return loadingScreen;
}

function changeMotive(state = "loading", text = "Por favor espere"){
    let image = loadingScreen.querySelector('img');
    let texth2 = loadingScreen.querySelector('h2');
    let button = loadingScreen.querySelector('button');

    texth2.textContent = text;
    
    if(state == "loading"){
        image.src = "Images/loading.gif";
        text.textContent = "Por favor espere";
        button.classList.add('not-displayed');
    }
    else if(state == "error"){
        image.src = "Images/error 2.gif";
    }
    else if(state == "success"){
        image.src = "Images/check-green.gif";
    }
    else{
        image.src = "Images/gato.gif";
        text.textContent = "Opsi Daisy";
    }

    if(state != "loading"){
        button.classList.remove('not-displayed');
    }
}

function toggleLoadingScreen() {
    loadingScreen.classList.toggle('invisible');
}

