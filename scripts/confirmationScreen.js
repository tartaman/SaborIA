 class ConfirmationWindow{
    constructor(title, text = null, event= null){
        this.pantallaConf = this.createConfirmation(title, text, event);
    }

    createConfirmation(title, text = null, event= null){
        const pantallaConf = document.createElement('div');
        pantallaConf.classList.add('pantalla-carga');
        pantallaConf.innerHTML = `
            <div class="centro-pantalla">
                <h2>${title}</h2>
                ${text != null ? `<p>${text}</p>` : ``}
                <div class="button-div">
                    <button class='button-verde button-eliminar' id="accept">Aceptar</button> 
                    <button class='button-verde' id="close">Cerrar</button> 
                </div>
            </div>
        `;

        pantallaConf.classList.add('invisible');
        pantallaConf.querySelector('#close').addEventListener('click', () => {
            this.hide()
        });

        if(event != null){
            pantallaConf.querySelector('#accept').addEventListener('click', event);     
        }
        
        return pantallaConf
    }

    show(){
        this.pantallaConf.classList.remove('invisible');
    }

    hide(){
        this.pantallaConf.classList.add('invisible');
    }

}

module.exports = ConfirmationWindow; 