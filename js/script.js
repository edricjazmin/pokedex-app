var repository = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    type: ['grass ', ' poison']
  },
  {
    name: 'Charmander',
    height: 1.7,
    type: 'fire'
  },
  {
    name: 'Squirtle',
    height: 0.5,
    type: 'water'
  }
];

for (var i = 0; i < repository.length; i++) {
  if (repository[i].height > 1) {
    document.write(
      repository[i].name + ' (height: ' + repository[i].height + 'm) - Wow, that\'s big! ' + '<br>')
  } else {
    document.write(
      repository[i].name + ' (height: ' + repository[i].height + 'm) ' + '<br>');
  }
}
