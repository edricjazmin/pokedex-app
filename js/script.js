var pokemonRepository = (function() {
  var repository = []; // array that acts as pokedex
  var apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    return repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

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
      item.weight = details.weight,
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(title, text) {
    var $modalContainer = document.querySelector('#modal-container');

    // Clears modal content
    $modalContainer.innerText = '';

    var moodal = document.createElement('div');
    $modalContainer.classList.add(modal);

    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x';
    closeButtonElement.addEventListener('click', hideModal);

    var titleElement = document.createElement('h1');
    titleElement.innerText = title;

    var contentElement = document.createElement('p');
    contentElement = text;

    pokemonModal.appendChild(closeButtonElement);
    pokemonModal.appendChild(titleElement);
    pokemonModal.appendChild(contentElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  document.querySelector('.currentPokemon').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  };

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
  //   hideModal();
  //   }
  //
  // $modalContainer.addEventListener('click', (e) => {
  //   var target = e.target;
  //   if (target === $modalContainer) {
  //     hideModal();
  //   }
  // });

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


var $pokemonList = document.querySelector('.pokemon-list'); //ul element

pokemonRepository.loadList().then(function() {

  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
