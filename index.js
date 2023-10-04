const content = document.querySelector('.cards');
let pokeData = [1, 2, 3];
/*
const PokemonList = document.getElementById('pokeList');
const searchBar = document.getElementById('searchBar');
let pokemonCharacters = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const characterFilter = pokemonCharacters.filter((character) => {
    return character.name.toLowerCase().includes(searchString);
  });
  displayCharacters(characterFilter);
})

const characterLoad = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0');
    displayCharacters(pokemonCharacters);
  } catch (error) {
    console.error(error);
  }
}
*/


// response = res. it can be called anything
const fetchData = async () => {
  await fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0')
    .then((response => response.json()))
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((response) => response.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other['official-artwork'].front_default,
              types: data.types,
            };
          });
      });
      Promise.all(fetches).then((response) => {
        pokeData = response;
        pokeCards();
      });
    });
};

const pokeCards = () => {
  const cards = pokeData
    .map((pokemon) => {
      console.log(pokemon.types)
      return `<div class="card">
    <img src="${pokemon.img}" alt="Pikachu">
    <h2></h2>
    <p>${pokemon.name}</p>
    <div>
    ${pokemon.types.map((type) => getTypeString(type)).join(' ')}
    </div>
  </div>`; //ADD MAP
    }).join('') //helps with comma issues

  content.innerHTML = cards;
};

const getTypeString = (type) => {
  return `<p>${type.type.name}</p>`
}
fetchData();
