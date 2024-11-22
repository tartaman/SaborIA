class LoadingScreen{
    constructor(){
        this.loadingScreen = this.createLoading();
        
    }

    createLoading(){
        let loadingScreen = document.createElement('div');
        loadingScreen.innerHTML = `
            <div class="centro-pantalla">
                <img src="Images/loading.gif" alt="Loading" >
                <h2>Por favor espere</h2>
                <button class='button-verde'>Cerrar</button>
            </div>
        `;
        loadingScreen.classList.add('pantalla-carga');
        loadingScreen.classList.add('invisible');

        const button = loadingScreen.querySelector('button');
        button.addEventListener('click', ()=>{
            this.toggleLoadingScreen();
        });

        return loadingScreen;
    }

    changeMotive(state = "loading", text = "Por favor espere"){
        console.log(this.loadingScreen);
        let image = this.loadingScreen.querySelector('img');
        let texth2 = this.loadingScreen.querySelector('h2');
        let button = this.loadingScreen.querySelector('button');
    
        texth2.textContent = text;
        
        if(state == "loading"){
            image.src = "Images/loading.gif";
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
            texth2.textContent = "Opsi Daisy";
        }
    
        if(state != "loading"){
            button.classList.remove('not-displayed');
        }
    }

    toggleLoadingScreen() {
        this.loadingScreen.classList.toggle('invisible');
    }
}


module.exports = LoadingScreen; 


