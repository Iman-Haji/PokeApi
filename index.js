const content = document.querySelector('.cards');
let pokeData = [];


const charactersList = document.getElementById('pokeList');
let pokeCharacters = [];


const loadCharacters = async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0');
    pokeCharacters = await res.json();
    displayCharacters(pokeCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (pokemon) => {
  const htmlString = pokemon.map((pokemon) => {
    return `<li class="pokeCharactersList">
                <p>types: ${pokemon.types}</p>
                <p>name: ${pokemon.name}</p>
                <img src="${pokemon.img}"></img>
            </li>`;
  }).join('');

  charactersList.innerHTML = htmlString;
};

loadCharacters();

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