var pokemonRepository = (function() {
  var repository = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type: 'fire'},
    {name: 'Squirtle', height: 0.5, type: 'water'},
    {name: 'Caterpie', height: 0.3, type: 'bug'},
    {name: 'Weedle', height: 0.3, type: ['bug', 'poison']},
    {name: 'Pidgey', height: 0.3, type: ['normal', 'flying']},
    {name: 'Rattata', height: 0.3, type: 'normal'}
  ];

  function add(pokemon) {
    return repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll();
  };

} ) ();

pokemonRepository.getAll().forEach(function(currentPokemon){
  if (currentPokemon.height > 0.6) {
    document.write(
      '<p>' + currentPokemon.name + ' (height: ' + currentPokemon.height + 'm) - Wow, that\'s big! ' + '</p> <hr>')
  } else {
    document.write(
      '<p>' + currentPokemon.name + ' (height: ' + currentPokemon.height + 'm) ' + '</p> <hr>');
  };
});
