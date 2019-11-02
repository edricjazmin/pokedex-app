var pokemonRepository = (function() {
  var repository = []; // array that acts as pokedex
  var apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    return repository.push(pokemon);//add pokemon to end of array
  }

  function getAll() {
    return repository;//display whole list of pokemon
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
      return response.json(); //gets API and converts into objects
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height,
      item.weight = details.weight,
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function addListItem(pokemon) {
    var $pokemonList = document.querySelector('.pokemon-list'); //ul element
    var listItem = document.createElement('li');

    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('currentPokemon');

    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);

    button.addEventListener('click', (e) => {
      showDetails(pokemon);
    });
  }  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  };

  var $modalContainer = document.querySelector('#modal-container');
  function showModal(name, height, weight, imageUrl) {
    $modalContainer.innerText = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x';
    closeButtonElement.addEventListener('click', hideModal);

    var textBox = document.createElement('div');
    textBox.classList.add('text-box');

    var titleElement = document.createElement('h1');
    titleElement.innerText = name;

    var contentElement1 = document.createElement('p');
    contentElement1.innerText = 'Height: ' + height + 'dm';

    var contentElement2 = document.createElement('p');
    contentElement2.innerText = 'Weight: ' + weight + 'dg';

    var contentImage = document.createElement('img');
    contentImage.src = imageUrl;

    modal.appendChild(closeButtonElement);
    textBox.appendChild(titleElement);
    textBox.appendChild(contentElement1);
    textBox.appendChild(contentElement2);
    modal.appendChild(contentImage);
    modal.appendChild(textBox);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  };

  function showDetails(item) { //is referenced in addListItem
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item.name, item.height, item.weight, item.imageUrl);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  }); //closes modal using escape key

  $modalContainer.addEventListener('click', (e) => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });//closes modal by clicking inside $modalContainer

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }; // able to interact with outside IIFE

})(); //acts as IIFE

pokemonRepository.loadList().then(function() {

  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
