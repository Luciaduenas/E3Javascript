const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

// Declaro los elementos del HTML
const form = document.getElementById("form")
const container = document.getElementById("container")
const error = document.getElementById("error")
const inputNumber = document.getElementById("input-number")


const init =() => {
  document.addEventListener("DOMContentLoaded", recuperarPizza)
  form.addEventListener("submit", searchPizza);
}

// Guardar en local storage la pizza buscada
const saveToLocalStorage = (last) =>{
  localStorage.setItem("ultimoItem", JSON.stringify(last));
};

// Declaro una constante de ultimoItem para poder renderizarlo, traigo el dato del local storage
const ultimoItem = JSON.parse (localStorage.getItem("ultimoItem"))

// Esta función indica que si hay un ultimoItem guardado lo renderice
const recuperarPizza = () =>{
  if (ultimoItem) {
    container.innerHTML =`<div id="card-container"><h3 class="nombre"><span>#${ultimoItem.id}</span>${ultimoItem.nombre}</h3>
        
    <div class="pizzaImgContainer"><img src="${ultimoItem.imagen}" alt=""></div>
    <p class="ingredientes">${ultimoItem.ingredientes}</p>
    <h3 class="precio">${ultimoItem.precio}</h3></div>`
    } else {
      container.innerHTML =""
    }
}

// Creo una constante donde pizza es igual a "buscar en pizza la pizza cuyo ID sea igual al input value, es decir al inputNumber" 
// Despues lo meto dentro de search pizza, transformandolo en una funcion

const searchPizza = (e) =>{
  e.preventDefault()

  // aca valido que no se ingrese datos vacíos
  if(inputNumber.value ==""){
    container.innerHTML=`<div id="card-container">
    <p class="error" id="error"> Por favor ingrese un número de ID</p>
</div>`
form.reset();
  } else {

    // Búsqueda de la ID de la pizza, va a retornar la info de la pizza seleccionada
    const buscarID = (inputNumber) =>{
      return pizzas.find ((pizza) => pizza.id == inputNumber.value )
    }

    if (buscarID){
      error.textContent=""
      // Guardo la info de la pizza seleccionada para poder ingresarla como parametro en el renderizado.
      let pizza = buscarID(inputNumber)
      if (pizza) {
      recuperarPizza(ultimoItem)
      const createCard = (pizza) =>{
        container.innerHTML =`<div id="card-container"><h3 class="nombre"><span>#${pizza.id}</span>${pizza.nombre}</h3>
        
        <div class="pizzaImgContainer"><img src="${pizza.imagen}" alt=""></div>
        <p class="ingredientes">${pizza.ingredientes}</p>
        <h3 class="precio">${pizza.precio}</h3></div>`
        }
        createCard (pizza)
        saveToLocalStorage(pizza)
        form.reset();
      
    } else {
      container.innerHTML=`<div id="card-container">
      <p class="error" id="error"> No existe una pizza con ese ID</p>
  </div>`
  form.reset();

      
    }

    }}
  }

 

init ()