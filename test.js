var Game = require('./app/scripts/Game');

// Play each range to see the result
[0,1,2,3,4,5].forEach(function (range) {
    var game = new Game(180, range, 50);
    game.play();
    game.displayResults();
});
