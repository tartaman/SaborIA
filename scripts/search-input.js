try {
    let input = document.querySelector("#ingredient-search")
    let container = document.querySelector("#contenedor-agregar")
    console.log(children2)
    let display = 5
    
    input.addEventListener("input", waos);
} catch {
    console.log("xd");
}


function waos(input, container) {
    let children2 = container.children
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
waos()