/* ejercicios 1 al 6 
let miNombre = "Lucas"
let miApellido = "Ferreira"
let miEdad = 31
let miMascota = "Elassar"
let edadMascota = 1 + (5 / 12)
console.log("Nombre, apellido y edad :", miNombre, " ", miApellido, " ", miEdad, "años");
console.log("Nombre, apellido y edad de la mascota :", miMascota, " ", edadMascota, "años"); */

/*ejecercicios 7 al  9
let nombreCompleto = miNombre + miApellido
let textoPresentacion = ("Nombre, apellido y edad :" + miNombre + " " + miApellido + " " + miEdad + " años ") 
+ ("Nombre, apellido y edad de la mascota : " + miMascota + " " + edadMascota + " años ,") + nombreCompleto
console.log(textoPresentacion);

let sumaEdades = miEdad + edadMascota
let restaEdades = miEdad - edadMascota
let productoEdades = miEdad * edadMascota
let divisionEdades = miEdad / edadMascota

console.log("suma edades : ", sumaEdades);
console.log("resta edades : ", restaEdades);
console.log("producto edades : ", productoEdades);
console.log("division edades : ", divisionEdades);*/

/*ej 10
miNombre = prompt("Nombre")
miApellido = prompt("Apellido")
miEdad = prompt("Edad")
miMascota = prompt("Nombre mascota")
edadMascota = prompt("Edad mascota")    
console.log("Nombre, apellido y edad :", miNombre, " ", miApellido, " ", miEdad, "años");
console.log("Nombre, apellido y edad de la mascota :", miMascota, " ", edadMascota, "años");*/

/*ej del 11 al 16 
let alumno = {nombreAlumno : "Lucas",
            apellidoAlumno : "Ferreira",
            edadAlumno : 31,
            nacionalidadAlumno : "Argentino",
            localidadAlumno : "Misiones"}
console.table(alumno)
console.log(alumno.nombreAlumno, alumno.apellidoAlumno, alumno.edadAlumno, alumno.nacionalidadAlumno, alumno.localidadAlumno) 

// ej 12 

let mascota = {nombreMascota : "Elassar",
            especieMascota : "Michi",
            edadMascota : 1 + (5/12),
            colorPelajeMascota : "Negro",
            colorOjosMascota : "amarillos"
            }
console.table(mascota)
console.log(mascota.nombreMascota, mascota.especieMascota, mascota.edadMascota, mascota.colorPelajeMascota, mascota.colorOjosMascota)  

// ej 13 
let frutas = ["manzana", "banana", "durazno", "pera", "naranja" ] 
console.table(frutas)
console.log(frutas[0],frutas[1],frutas[2],frutas[3],frutas[4])   

// ej 14 
let numeros = [89 , 845 , 21 , 45 , 84 ] 
console.table(numeros)
console.log(numeros[0],numeros[1],numeros[2],numeros[3],numeros[4])   

// ej 15 
let auto = {nombreAuto : "Ferrari",
            modeloAuto : "Enzo",
            anioAuto : 1983,
            colorAuto : "Negro",}
            
let familia = {alumno, mascota, frutas, numeros, auto}
console.table(familia)
console.table(alumno)
console.table(frutas)
console.table(numeros)
console.table(auto)


// ej 16 

let textoAleatorio = [frutas[1] , numeros[3], familia.auto ];
console.table(textoAleatorio)
 
*/


/* // ej 17 
let miEdad = Number
let edadCompaniero = Number
let edadesIguales = false
let soyMayor = false
let soyMenor = false


miEdad = prompt("Ingrese su edad")
edadCompaniero = prompt("Ingrese edad del compañero")

if(miEdad == edadCompaniero){
    edadesIguales = true
}

if( miEdad > edadCompaniero){
    soyMayor = true
}else{
    if(miEdad < edadCompaniero){
    soyMenor = true}
}

console.log(miEdad , edadCompaniero)
console.warn("mi edad es igual a la de mi compañero: ", edadesIguales)
console.warn("Mi edad es mayor a la de mi compañero: ", soyMayor)
console.warn("Mi edad es menor a la de mi compañero: ", soyMenor) */

/*
// ej 18
miEdad = Number
miEdad = prompt("Ingrese su edad")
soyMayorDeEdad = "Soy mayor de edad: " + miEdad
if (miEdad >= 18){
    console.warn(soyMayorDeEdad)
}else{
    console.warn("no es mayor")
}
*/

/* 
// ej 19
let edad = Number
let altura = Number
let puedeSubir = Boolean

edad = prompt("Ingrese su edad")
altura = prompt("Ingrese su altura en cm")    
console.log(edad, altura)
if((edad > 6) && (altura > 120)){
    puedeSubir = true
    console.warn("Puede subir a la atraccion", puedeSubir)
}else{
    puedeSubir = false
    console.warn("No puede subir", puedeSubir)
}

*/


/*
//ej20
pase = String
saldo= Number
pase = prompt("Ingrese su pase VIP, NORMAL o LIMITADO")
saldo = prompt("Ingrese su saldo disponible")

if((pase=="VIP") || (saldo>1000)){
    console.warn("Puede pasar", pase , saldo)
}else{
    console.warn("No puede pasar", pase , saldo)
}
*/