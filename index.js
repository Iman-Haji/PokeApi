const content = document.querySelector('.cards');
let pokeData = [1, 2, 3];

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
      return `<div class="card">
    <img src="${pokemon.img}" alt="Pikachu">
    <h2></h2>
      <p>${pokemon.name}</p>
  </div>`;

    }).join('') //helps with comma issues


  content.innerHTML = cards;
};

fetchData();