const urlApi = './assets/js/amazing.json'
let events
let cards = document.getElementById("cards")
const $search = document.getElementById("search")
const catsChecks = document.getElementById("categories")


fetch(urlApi)
    .then(response => response.json())
    .then(data => {
        events = data.events
        let eventsFilter = events
        createCards(eventsFilter, cards)

        //obtener categorias desde data, imprimir checkbox por categoria
        let categories = eliminarRepetidos(mapCategories(events))
        createCatsChecks(categories, catsChecks)
        //obtener checkbox :checked
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        const filtrarCheckboxs = () => {
            let statusCheckboxs = [];
            checkboxes.forEach((checkbox) => {
                if ((checkbox.name !== "") && (checkbox.checked == true)) {
                    statusCheckboxs.push({
                        name: checkbox.name.replace(/\s+/g, '')
                    })
                }
            })
            return statusCheckboxs
        }

//filtrar eventos x categorias x eventos filtrados por checkbox checkeds(redundante si 4am si)
        const eventsByCategory = (array) => {
            let eventoses = []
            array.forEach(event => {
                filtrarCheckboxs().forEach(checkbox => {
                    if ((event.category.toLocaleLowerCase().replace(/\s+/g, '')) == checkbox.name) {
                        eventoses.push(event)
                    }
                })
            })
            if (eventoses.length > 0) {
                return eventoses
            } else {
                eventoses = events
                return eventoses
            }
        }

        //change listener en el array de checkboxes
        catsChecks.addEventListener('change', () => {
            eventsFilter = filterSearch(eventsByCategory(events), $search.value)
            createCards(eventsFilter, cards)

        })

        //searchBar listener        
        $search.addEventListener('keyup', () => {
            eventsFilter = filterSearch(eventsByCategory(events), $search.value)
            createCards(eventsFilter, cards)
        })
    })
    .catch(error => console.log(error))

//imprimir cartas
const createCards = (events, cards) => {
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
const mapCategories = (array) => {
    return array.map(categories => categories.category.toLowerCase())
}

//filtro repetidos categorias
const eliminarRepetidos = (array) => {
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
const createCatsChecks = (array, catsChecks) => {
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