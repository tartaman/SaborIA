let input = document.querySelector("#ingredient-search")
let container = document.querySelector("#contenedor-agregar")
let children2 = container.children
console.log(children2)
let display = 5
function waos() {
    let count = 0
        for (const child of children2) {
            if (count < display) {
                if (child.querySelector("label").innerText.toLowerCase().includes(input.value.toLowerCase())) {
                    child.style.display = "flex";
                    count++;
                } else {
                    child.style.display = "none";
                }
            } else {
                child.style.display = "none";
            }
        }
};
input.addEventListener("input", waos);
waos()