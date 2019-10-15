var pokemonRepository = (function() {
  var repository = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type: 'fire'},
    {name: 'Squirtle', height: 0.5, type: 'water'},
    {name: 'Caterpie', height: 0.3, type: 'bug'},
    {name: 'Weedle', height: 0.3, type: ['bug', 'poison']},
    {name: 'Pidgey', height: 0.3, type: ['normal', 'flying']},
    {name: 'Rattata', height: 0.3, type: 'normal'}
  ]; // array that acts as pokedex

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

  function showDetails(pokemon) {
    console.log(pokemon);
  }1

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  }; // able to interact with outside IIFE

} ) (); //acts as IIFE

var $pokemonList = document.querySelector('.pokemon-list');

pokemonRepository.getAll().forEach(function(currentPokemon){
  pokemonRepository.addListItem(currentPokemon);
});
