const tarea = document.getElementById("agregarTareas");
let listaTarea = document.querySelector(".lista-tareas");
const input = document.getElementById("input-text");
let arreglo = []
let arrayTareas = []
let completed = []
let busqueda = undefined


    

//agregar a tareas

const addTareas = (evt) => {
    evt.preventDefault()
    
    arreglo.push(input.value)
    arreglo.forEach(Element => {
        if(!arrayTareas.includes(Element)){
            arrayTareas.push(Element)
            listOfTareas(arrayTareas)
        }
    })
    let inputCheckbox = document.querySelectorAll("[type=checkbox]")
        inputCheckbox.forEach(Element => {
            Element.addEventListener("click", () => {
                inputCheckbox.forEach(radio => {
                    if(radio.checked){
                        radio.parentElement.classList.add("seleccionado")
                        arreglo.push(radio.value)
                        arreglo.forEach(Element => {
                            if(!completed.includes(Element)){
                                completed.push(Element)
                            }
                        })

                        console.log(completed);

                    }else {
                        radio.parentElement.classList.remove("seleccionado")
                        busqueda = radio.value
                        let index = arrayTareas.indexOf(busqueda)
                        if (index > -1) {
                            completed.splice(index, 1);
                            console.log("eliminado " + radio.value);
                        }
                    }
                })
            })
        })
    
}


//renderizar en la lista

const listOfTareas = (data) => {
    input.value = ""
    listaTarea.innerHTML = " "
    data.forEach((Element, index) => {
        // let li = document.createElement("li")
        // let texto = document.createTextNode(Element)
        // let img = document.createElement("img")
        // img.src = "./images/icon-cross.svg"
        listaTarea.innerHTML += `
            <li>
                <input type="checkbox" id=${index} value=${Element} />
                <label for=${index}>${Element}</label>
                <img src="./images/icon-cross.svg" />
            </li>
        ` 
        // li.appendChild(img)
        // li.appendChild(texto)
        // listaTarea.appendChild(li)
    })
}


const deleteTarea = (evt) => {
    
}

//falta lo que esta completado o que esta marcado
listaTarea.addEventListener("click", evt => {
    if(evt.target.tagName === "IMG"){
        busqueda = evt.target.previousElementSibling.innerText
        
        let index = arrayTareas.indexOf(busqueda)

        if (index > -1) {
            arrayTareas.splice(index, 1);
            console.log(arrayTareas);
        }
    listOfTareas(arrayTareas)
        // evt.target.parentNode.classList.add("elimaado")
    }
    // else if(evt.target.tagName === "LABEL" || evt.target.type == "checkbox"){
    //     console.log("Agregado a completado");
        
    // }
    
    

    
    // if(evt.target.nodeName === "IMG"){
    //     console.log("click");
    //     // evt.target.parentNode.classList.add("activo")
    //     evt.target.classList.add("activo")
    // }
    // console.log(evt.target);

    // let elemento = evt.target
    // elemento.parentNode.classList.add("activo")
})

tarea.addEventListener("submit", addTareas)
// listaTarea.addEventListener("click", deleteTarea)
