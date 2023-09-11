const form = document.getElementById("form")
const inputNumber = document.getElementById("input-number")
const cardContainer = document.getElementById ("container")

// Creo un funcion para adaptar los datos que necesito

const pokemonDataAdapter = (pokemon) =>{
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.home.front_default,
        type: pokemon.types[0].type.name,
        height: pokemon.height / 10,
        weight: pokemon.weight / 10
    }
}

// Creo la funcion para crear el html de la card

const createCardTemplate = (pokemon) =>
{ const {id, name, image,type, height,weight} = pokemonDataAdapter (pokemon);
return ` <div class="card-container">
<img src="${image}" alt="">
<h2 class="name">${name}</h2>
<div class="descripcion">
    <p class="descripcion-title">Tipo principal: <span class="type">${type}</span></p>
    <p class="descripcion-title">Medida: <span class="height">${height} cm</span></p>
    <p class="descripcion-title">Peso: <span class="weight">${weight} kg</span></p>
</div>

</div>`

}

// Funcion para renderizar la card
const renderCard =(pokemon) =>{
    cardContainer.innerHTML = createCardTemplate(pokemon);
}

// Chequea que el input no este vacio
const isEmptyInput = (inputNumber) =>{
    return !inputNumber.value.trim().length;
} 

//chequea que el input ingresado corresponde a un pokemon id
// const isInValidPokemon = (fetchedPokemon) =>{
//     return !fetchedPokemon.id;
// }
 
// funcion que consulta el pokemon en la api
const searchPokemon = async (e) => {
    e.preventDefault()

    if (isEmptyInput(inputNumber)) {
        cardContainer.innerHTML= `<div class="error-container"><img src="Assets/pikachu.png" alt="error 404 not found"><h2 class="error">Por favor ingrese un número de Pokemon</h2></div>`
        return;
    }
    
    const fetchedPokemon = await getPokemon (inputNumber.value)

    if(fetchedPokemon){
        renderCard(fetchedPokemon)
        form.reset()
     return;
    } else {
        cardContainer.innerHTML= `<div class="error-container"><img src="Assets/not found.png" alt="error 404 not found"><h2 class="error"><span>ERROR 404</span> "Not Found" No existe un pokemon con ese id</h2></div>`
        form.reset()
        return;  
    }
    }


init =()=>{
    form.addEventListener("submit", searchPokemon)
}

init()