const getPokemon = async (pokemonID) => {
    try{
        const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        const data = await response.json ()
        console.log (data);
        return data;
    
    } catch (error) {
        console.log (`hubo un error y es: ` + error);
        

    }
}