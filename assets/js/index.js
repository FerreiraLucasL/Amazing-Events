import data from './data.js'

let events = data.events
const cards = document.getElementById("cards");

//imprimir cartas
function createCards(events, cards) {
    cards.innerHTML = ""
    if(events.length > 0) {
        for(let event of events) {
            let div = document.createElement("div");
            div.className = "card";
            div.innerHTML += ` 
                <img class="card-img-top" src="${event.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.place}</p>
                    <p class="card-text">${event.date}</p>
                    <p class="card-text">${event.category}</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal" id="${event.id}">Details</button>
                </div>
            `
            cards.appendChild(div)
        }
    }else{
        let div = document.createElement("div");
        div.className = "sinResultados";
        div.innerHTML += ` 
        <h5 class="card-title">Sin Resultados</h5>
        `
        cards.appendChild(div)
    }
}
createCards(events, cards)

//mapeo categorias (con repetidos)
const mapCategories = (array) => {
    return array.map(categories => categories.category.toLowerCase())    
}
let allCategories = mapCategories(events)

//filtro repetidos categorias
let categories
const eliminarRepetidos = (array) => {        
    let arrayDevuelto
    arrayDevuelto = array.reduce((acc, elem) => {
        if(!acc.includes(elem)){
            acc.push(elem)
        }
        return acc
    }, [])
    return arrayDevuelto
}
categories = eliminarRepetidos(allCategories)

//checkbocks categorias
const catsChecks = document.getElementById("categories");
const createCatsChecks = (array, catsChecks) => {
    array.forEach(category =>{
        let div = document.createElement("div")
        div.className = `checksCategory ${category}`
        div.innerHTML = `
        <input type="checkbox" id=${category.replace(/\s+/g,'')} name="${category}"/>
        <label for="${category.replace(/\s+/g,'')}">${category}</label>
        `        
        catsChecks.appendChild(div)
    })
}
//categories.push("todos") deprecado :v
createCatsChecks(categories, catsChecks)

//filtrado por categorias
const filterChecks = (array) => {
    let checked = []
    checked = document.querySelector('input[type=checkbox]:checked');
    if (checked==null){
        checked=""
    }
    console.log(checked)
    let filteredArray = array.filter(element => element.category.toLowerCase().includes(checked.name))
    return filteredArray
}
catsChecks.addEventListener('change', () =>{
    let catsFilter = filterChecks(events)
    createCards(catsFilter, cards)
})


//busqueda por nombre
const filterSearch = (array, value) => {
    let filteredArray = array.filter(element => (element.name.toLowerCase().includes(value.toLowerCase())))
    return filteredArray
}

const $search = document.getElementById("search")
$search.addEventListener('keyup', () => {
    let eventFilter = filterSearch(filterChecks(events), $search.value)
    createCards(eventFilter, cards)    
})

//details
