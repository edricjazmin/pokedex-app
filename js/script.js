var repository = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    type: ['grass ', ' poison']
  },
  {
    name: 'Charmander',
    height: 0.6,
    type: 'fire'
  },
  {
    name: 'Squirtle',
    height: 0.5,
    type: 'water'
  },
  {
    name: 'Caterpie',
    height: 0.3,
    type: 'bug'
  },
  {
    name: 'Weedle',
    height: 0.3,
    type: ['bug', 'poison']
  },
  {
    name: 'Pidgey',
    height: 0.3,
    type: ['normal', 'flying']
  },
  {
    name: 'Rattata',
    height: 0.3,
    type: 'normal'
  }
];

for (var i = 0; i < repository.length; i++) {
  if (repository[i].height > 0.6) {
    document.write(
      '<p>' + repository[i].name + ' (height: ' + repository[i].height + 'm) - Wow, that\'s big! ' + '</p> <hr>')
  } else {
    document.write(
      '<p>' + repository[i].name + ' (height: ' + repository[i].height + 'm) ' + '</p> <hr>');
  }
}
