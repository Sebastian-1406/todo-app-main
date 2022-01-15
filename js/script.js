let icons = document.querySelector(".modo")
let arrayAll = [
   
]
let arrayActive = []
let arrayComplete = []
let arrayUnico = undefined


//formulario
let agregarValor = document.getElementById("agregarValor")
let agregar = document.querySelector(".agregar")

//lista de tareas
let listaTarea = document.querySelector(".lista-tareas")
let radio = document.querySelectorAll("[type=radio]")

let eliminarTareas = document.getElementById("eliminarTareas")
let items = document.getElementById("items")

const modeTheme = () => {
    let nodo = icons.parentElement
    nodo.classList.toggle("animation-rotate")
    if(nodo.classList.contains("animation-rotate")){
        nodo.classList.remove("animation-rotate360")    
        icons.src = "./images/icon-sun.svg"
    }else{
        nodo.classList.remove("animation-rotate")    
        nodo.classList.add("animation-rotate360")    
        icons.src = "./images/icon-moon.svg"
    }
}

const agregarPush = (dato) => {
    arrayActive = []
    arrayComplete = []

    if(dato === "Active"){
        arrayAll.forEach(({active, completed}) => {
           if(completed) {}
           else arrayActive.push({active, completed})
        })        
    }else if (dato === "Complete"){
        arrayAll.forEach(({active, completed}) => {
            completed ? arrayComplete.push({active, completed}) : " "
        })       
    }
}
agregarPush()

const agregarTareas = (evt) => {
    evt.preventDefault()
    arrayAll.push({active : agregarValor.value, completed : false})
    agregarValor.value = ""
    listOfTareas(arrayAll)    
    agregarPush()
}

const listOfTareas = ({array = "arrayAll"} = {}) =>  {  
    
    listaTarea.innerHTML = " "
    items.innerHTML = " "
    
    if(array === "arrayAll") {
        arrayUnico = arrayAll
    }else if(array === "Active"){
        arrayUnico = arrayActive
    }else if(array === "Complete"){
        arrayUnico = arrayComplete
    }

    if(arrayUnico.length >= 1){
        items.innerHTML = `${arrayUnico.length} items left `
    }else {
        items.innerHTML = `${arrayUnico.length} items left `
    }
        
    arrayUnico.forEach(({active, completed}, index) => {
        let li = document.createElement("li")
        listaTarea.append(li)
        li.innerHTML += `
        <label for=${index} class=${completed ? "activo" : ""}>
              <input type="checkbox" id=${index} ${completed ? "checked" : " "}>
              ${active}
            </label>
            <img src="./images/icon-cross.svg" alt="">
        `
    })
}

radio.forEach(Element => {
    Element.addEventListener("click", () => {
        radio.forEach(Element => {
            if(Element.checked){
                Element.parentElement.classList.add("options-active")
                if(Element.id === "All"){
                    listOfTareas(arrayAll)
                }
                else if(Element.id === "Active"){
                    agregarPush("Active")
                    listOfTareas({array : "Active"})
                }
                else if(Element.id === "Completed"){
                    agregarPush("Complete")
                    listOfTareas({array : "Complete"})
                }
            }else{
                Element.parentElement.classList.remove("options-active")
            }
        })
    })    
})

const validarCheckbox = (evt) => {
    
    if(evt.target.tagName === "IMG"){
        let nodo = evt.target.parentElement;
        let input = nodo.children[0].children
        let id = input[0].id
        id = Number(id)

        if (id > -1) {
            arrayAll.splice(id, 1);
            listOfTareas()          
        }
        
        
    }
    let checkbox = document.querySelectorAll("[type=checkbox]")
    checkbox.forEach(Element => {
        Element.addEventListener("click", () => {
            arrayComplete = []
            checkbox.forEach(Element => {
                if(Element.checked){
                    Element.parentElement.classList.add("activo")
                    arrayComplete.push({active : Element.parentElement.outerText, completed : true})
                    arrayAll[Element.id].completed = true
                }else{
                    Element.parentElement.classList.remove("activo")
                    arrayAll[Element.id].completed = false
                }
            })
        })    
    })
}

const deleteTareas = () => {
    arrayAll.forEach(Element => {
        Element.completed = false
    })
    listOfTareas()
}

agregar.addEventListener("submit", agregarTareas)
window.addEventListener("load", listOfTareas)
listaTarea.addEventListener("click", validarCheckbox)
eliminarTareas.addEventListener("click", deleteTareas)
icons.addEventListener("click", modeTheme)