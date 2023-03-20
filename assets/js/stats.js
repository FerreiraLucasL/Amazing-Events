const urlApi = '../js/amazing.json'
let events
const tables = document.getElementById("tables")
const tblBody = document.createElement("tbody");

fetch(urlApi)
    .then(response => response.json())
    .then(data => {
        events = data.events
        let categories = eliminarRepetidos(mapCategories(events))
        let table = document.createElement("table")
        crearTablaES(table, hpoaEventFunction(events), lpoaEventFunction(events), largerCapacityEvent(events))
        tables.appendChild(table)
        crearTablaUP(table, revenuesXcategoriesFunc(data), data.currentDate, categories)
        tables.appendChild(table)
        crearTablaPast(table, revenuesXcategoriesFunc(data), data.currentDate, categories)
        tables.appendChild(table)
    })
    .catch(error => console.log(error))
//highest porcentage of assistance event
const hpoaEventFunction = (array) => {
    let hpoa = 0
    let aux = (array.assistance * 100) / array.capacity
    let hpoaEvent
    array.forEach(x => {
        aux = (x.assistance * 100) / x.capacity
        if (hpoa < aux) {
            hpoa = aux
            hpoaEvent = x
        }
    })
    return hpoaEvent
}
//lowest porcentage of assistance event
const lpoaEventFunction = (array) => {
    let aux = 0
    let lpoa = (array[0].assistance * 100) / array[0].capacity
    let lpoaEvent
    array.forEach(x => {
        aux = (x.assistance * 100) / x.capacity
        if (aux < lpoa) {
            lpoa = aux
            lpoaEvent = x
        }
    })
    return lpoaEvent
}
//larger capacity event
const largerCapacityEvent = (array) => {
    let lce = 0
    let aux
    let lceEvent
    array.forEach(x => {
        aux = x.capacity
        if (aux > lce) {
            lce = aux
            lceEvent = x
        }
    })
    return lceEvent
}
//funcion que recibe array eventos y devuelve un array con el porcentaje de asistencia y revenue X/C evento
const revenuesXcategoriesFunc = (array) => {
    let revenuesXcategories = []
    let events = array.events
    let revenuesXcategorie
    let revenue
    let poa

    events.forEach(e => {
        if (e.assistance == null) {
            revenue = (e.price * e.estimate)
        } else {
            revenue = (e.price * e.assistance)
        }
        if (e.assistance == null) {
            poa = ((e.estimate * 100) / e.capacity)
        } else {
            poa = ((e.assistance * 100) / e.capacity)
        }

        revenuesXcategorie = {
            "category": e.category,
            "revenue": revenue, // (e.price*e.assistance) por asistencia o estimado
            "poa": poa, //((e.assistance*100)/e.capacity)//por assitencia o estimado
            "date": e.date,
        }
        revenuesXcategories.push(revenuesXcategorie)
    })

    return (revenuesXcategories);
}

//funcion que recibe una categoria y array de poa, devuelve el promedio de % de assit de todos los eventos
const poaCatFunc = (cat, array) => {
    let acu = 0
    let cantE = 0
    array.forEach(e => {
        if (cat == e.category) {
            acu += e.poa
            cantE++
            console.log(e);
        }
    })
    return (acu / cantE)
}

//funcion que recibe una categoria y devuelve el revenue de la cat de todos los eventos
const revCatFunc = (cat, array) => {
    let rev = 0
    array.forEach(e => {
        if (cat == e.category) {
            rev += e.revenue
        }

    })
    return (rev)
}
//mapeo categorias (con repetidos)
const mapCategories = (array) => {
    return array.map(categories => categories.category)
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
//filtro eventos por fecha

const crearTablaES = (table, hpoa, lpoa, larger) => {
    table.innerHTML += `
    <thead>      
                <tr>
                    <th>Event Statistics</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    Event with the highest percentage of attiendance
                </td>
                <td>
                    Event with the lowest percent of attiendance
                </td>
                <td>
                    Event with larger capacity
                </td>
            </tr>
            <tr>
                <td> ${hpoa.name}</td>
                <td> ${lpoa.name}</td>
                <td> ${larger.name}</td>
            </tr>
            </tbody>
    `
}

const crearTablaUP = (table, arrayEventos, currentDate, categories) => {
    let arrayTotales = []
    let totalXcat = {
        "category": String,
        "totalRevenue": Number = 0,
        "poa": Number = 0,
        "npoa": Number = 0,
    }
     
    for(let cat = 0; cat < categories.length; cat++) {
        let arrayTotalXCat = arrayEventos.filter(a => a.category === categories[cat])
        arrayTotalXCat.forEach(a => {
            if (a.date > currentDate) {
                totalXcat.totalRevenue += a.revenue
                totalXcat.poa += a.poa
                totalXcat.npoa += 1
            }
        })
        totalXcat.category = categories[cat]
        totalXcat.poa = totalXcat.poa / totalXcat.npoa
        arrayTotales.push(totalXcat)
        totalXcat = {
            "category": String,
            "totalRevenue": Number = 0,
            "poa": Number = 0,
            "npoa": Number = 0,
        }
    }
table.innerHTML += `
    <thead>
        <tr>
            <th>Upcoming events statistics by category</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>
            Categories
        </td>
        <td>
            Revenues
        </td>
        <td>
            Percentage of attendence
        </td>
        </tr>
    </tbody>
    `
arrayTotales.forEach(a => { 
table.innerHTML += `
    <tbody>
    <tr>
    <td>
        ${a.category}
    </td>
    <td>
        ${a.totalRevenue}
    </td>
    <td>
        ${a.poa}
    </td>
    </tr>
</tbody>`
})
}




const crearTablaPast = (table, arrayEventos, currentDate, categories) => {
    let arrayTotales = []
    let totalXcat = {
        "category": String,
        "totalRevenue": Number = 0,
        "poa": Number = 0,
        "npoa": Number = 0,
    }
     
    for(let cat = 0; cat < categories.length; cat++) {
        let arrayTotalXCat = arrayEventos.filter(a => a.category === categories[cat])
        arrayTotalXCat.forEach(a => {
            if (a.date < currentDate) {
                totalXcat.totalRevenue += a.revenue
                totalXcat.poa += a.poa
                totalXcat.npoa += 1
            }
        })
        totalXcat.category = categories[cat]
        totalXcat.poa = totalXcat.poa / totalXcat.npoa
        arrayTotales.push(totalXcat)
        totalXcat = {
            "category": String,
            "totalRevenue": Number = 0,
            "poa": Number = 0,
            "npoa": Number = 0,
        }
    }
table.innerHTML += `
    <thead>
        <tr>
            <th>Past Events statistics by category</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>
            Categories
        </td>
        <td>
            Revenues
        </td>
        <td>
            Percentage of attendence
        </td>
        </tr>
    </tbody>
    `
arrayTotales.forEach(a => { 
table.innerHTML += `
    <tbody>
    <tr>
    <td>
        ${a.category}
    </td>
    <td>
        ${a.totalRevenue}
    </td>
    <td>
        ${a.poa}
    </td>
    </tr>
</tbody>`
})
}