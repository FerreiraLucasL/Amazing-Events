const urlApi = '../js/amazing.json'
let events
const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
let card = document.getElementById("detailsCard")


fetch(urlApi)
    .then(response => response.json())
    .then(data => {    
        let event = data.events.find(events => events._id == id)
        let div = document.createElement("div");
            div.className = "card";
            div.id = "detailsCard"
            div.innerHTML += `
                <img class="card-img-top" src="${event.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title"> Event name: ${event.name}</h5>
                    <p class="card-text">Event place: ${event.place}</p>
                    <p class="card-text">Event date: ${event.date}</p>
                    <p class="card-text">Event category: ${event.category}</p>
                    <p class="card-text">Event assitance: ${event.assistance}</p>
                    <p class="card-text">Event capacity: ${event.capacity}</p>                    
                    <p class="card-text">Event description: ${event.description}</p>
                    <p class="card-text">Event price: ${event.price}</p>
                    <a href="../../index.html">
                        <button type="button" class="btn btn-primary">Home</button>
                    </a>
                </div>
            `
            card.appendChild(div)
    })
    .catch(error => console.log(error))