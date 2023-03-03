import data from './data.js'

let events = data.events
const cards = document.getElementById("cards");
function createCards(events, cards) {
    for (let event of events) {
        if (event.date < data.currentDate) {
            let div = document.createElement("div");
            div.className = "card";
            div.innerHTML += ` 
            <img class="card-img-top" src="${event.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.place}</p>
                <p class="card-text">${event.date}</p>
                <a href="#" class="btn btn-primary">details...</a>
            </div>
        `
            cards.appendChild(div)
        }
    }
}
createCards(events, cards)
