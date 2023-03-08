import data from './data.js'

let events = data.events
const cards = document.getElementById("cards");


//imprimir cartas
function createCards(events, cards) {
    cards.innerHTML = ""
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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">Details</button>
            </div>
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
        <input type="checkbox" id=${category} name="category"/>
        <label for="${category}">${category}</label>
        `        
        catsChecks.appendChild(div)
    })
}
//categories.push("todos")
createCatsChecks(categories, catsChecks)

//filtrado por categorias
const filterChecks = (array) => {
    let checked = document.querySelector('input[type=checkbox]:checked');    
    let filteredArray = array.filter(element => element.category.toLowerCase().includes(checked.id))
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
$search.addEventListener('keyup', (e) => {
    let eventFilter = filterSearch(events, e.target.value)
    console.log(e.target.value)
    createCards(eventFilter, cards)
})


