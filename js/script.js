var pokemonRepository = (function() {
  var repository = []; // array that acts as pokedex
  var apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    return repository.push(pokemon);
  }

  function getAll() {
    return repository;
  } // end of pokemonRepository

  function addListItem(pokemon) {
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('currentPokemon');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height,
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }; // able to interact with outside IIFE
})(); //acts as IIFE

var $pokemonList = document.querySelector('.pokemon-list');

pokemonRepository.loadList().then(function() {

  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
