import data from './data.js'

let events = data.events
const cards = document.getElementById("cards");

//imprimir cartas
function createCards(events,cards) {
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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
        `
        cards.appendChild(div)                
    }    
}
createCards(events,cards)

