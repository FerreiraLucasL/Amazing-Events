let urlApi = "./assets/js/amazing.json"
let datos = []
fetch(urlApi)
    .then(response => response.json())
    .then(data => {
        let cards = document.getElementById("cards");
        const catsChecks = document.getElementById("categories");
        const $search = document.getElementById("search")
        createCards(data.events)
        //checkboxs
        let categories = eliminarRepetidos(mapCategories(data.events))
        createCatsChecks(categories, catsChecks)

        //filtrar eventos x categorias
        const eventsByCategory = (array) => {
            let eventoses = []
            data.events.forEach((event) => {
                console.log(event);
                filtrarCheckboxs().forEach((checkbox) => {
                    if ((event.category.toLocaleLowerCase().replace(/\s+/g, '')) == checkbox.name) {
                        eventoses.push(event)
                    }
                })
            })
            if (eventoses.length > 0) {
                return eventoses
            } else {
                eventoses = data.events
                return eventoses
            }
        }
        //checkboxs filter
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const filtrarCheckboxs = () => {
            let estadoCheckboxes = [];
            checkboxes.forEach((checkbox) => {
                if ((checkbox.name !== "") && (checkbox.checked == true)) {
                    estadoCheckboxes.push({
                        name: checkbox.name.replace(/\s+/g, '')
                    });
                }
            });
            return estadoCheckboxes
        }

        //change listener en el array de checkboxes
        catsChecks.addEventListener('change', () => {
            let eventsFiltrados = filterSearch(data.events, $search.value)
            createCards(eventsByCategory(eventsFiltrados), cards)
        })

        //searchBar listener        
        $search.addEventListener("keyup", () => {
            let eventFilter = filterSearch(data.events, $search.value)
            createCards(eventFilter, cards)
        })
    })
    .catch(error => console.log(error))
    
//funciones grales
//imprimir cartas
const createCards = (events, cards) =>{
    cards.innerHTML = ""
    //caso de no haber nada que imprimir avisar al usuario
    if (events.length > 0) {
        for (let event of events) {
            let div = document.createElement("div");
            div.className = "card";
            div.innerHTML += `
                <img class="card-img-top" src="${event.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.place}</p>
                    <p class="card-text">${event.date}</p>
                    <p class="card-text">${event.category}</p>
                    <button type="button" name="detailsButton" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal" id="${event._id}">Details</button>
                </div>
            `
            cards.appendChild(div)
        }
    } else {
        let div = document.createElement("div");
        div.className = "sinResultados";
        div.innerHTML += ` 
        <h5 class="card-title">Sin Resultados</h5>
        `
        cards.appendChild(div)
    }
}

//mapeo categorias (con repetidos)
const mapCategories = (array) =>{
    return array.map(categories => categories.category.toLowerCase())
}

//filtro repetidos categorias
const eliminarRepetidos = (array) =>{
    let arrayDevuelto
    arrayDevuelto = array.reduce((acc, elem) => {
        if (!acc.includes(elem)) {
            acc.push(elem)
        }
        return acc
    }, [])
    return arrayDevuelto
}

//imprimir checkbox's categorias
const createCatsChecks = (array, catsChecks) =>{
    array.forEach(category => {
        let div = document.createElement("div")
        div.className = `${category.replace(/\s+/g, '')}`
        div.innerHTML = `
        <input type="checkbox" id=${category.replace(/\s+/g, '')} name="${category}"/>
        <label for="${category.replace(/\s+/g, '')}">${category}</label>
        `
        catsChecks.appendChild(div)
    })
}

//busqueda por nombre
const filterSearch = (array, value) => {
    let filteredArray = array.filter(element => (element.name.toLowerCase().includes(value.toLowerCase())))
    return filteredArray
}