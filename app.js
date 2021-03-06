var Table = require('cli-table');

var spins = require('./data/spins');

var ranges = [
    [ 1, 2, 3, 4, 5, 6],
    [ 7, 8, 9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
    [31,32,33,34,35,36]
];

var Game = function (target, range, start) {

    this.target = target || 60; // Target for total winnings
    this.range = range || 0;    // Choose the range to bet on
    this.start = start || 0;    // Start at the first random number unless specified
    this.cashout = this.target; // Store original target value as cashout figure

    // Starting values
    this.divisor = 12;
    this.wager = 5;
    this.result = 0;
    this.progress = 0;

    // Display results
    this.table = new Table({
        head: ['Range', 'Target', 'Divisor', 'Bet', 'Spin', 'Result', 'Progress']
    });

    // Track game stats
    this.losses = 0;
    this.rounds = 0;
};

Game.prototype.play = function () {
    var i = this.start;

    while (this.progress < this.cashout) {
        this.spinTheWheel(i++);
    }
};

Game.prototype.displayResults = function () {
    console.log(this.table.toString());
};

Game.prototype.spinTheWheel = function (index) {

    // Grab the next number from the random series
    var spin = spins[index];

    // If spin is in the range, add winnings to kitty, otherwise subtract wager
    this.result = ranges[this.range].indexOf(spin) !== -1 ? this.wager * 5 : -this.wager;

    // Add the result to our tally
    this.progress += this.result;

    // Add the results of this spin to our table
    this.table.push([
        this.range + 1, this.target, this.divisor, this.wager, spin, this.result, this.progress
    ]);

    // Modify our target to accommodate losses
    this.target = this.target - this.result;

    // Note if this is a winning round
    this.collect = this.result > 0;

    // Count successive losses
    this.losses = this.collect ? 0 : this.losses++;

    if (this.collect) {
        // Modify our stakes if we've had a collect
        this.divisor = this.divisor - 2;
    }

    // Modify our wager
    this.wager = this.roundUpToNearestFive(this.target / this.divisor);
};

Game.prototype.roundUpToNearestFive = function (num) {
    return Math.ceil(num / 5) * 5;
};



// Play each range to see the result
[0,1,2,3,4,5].forEach(function (range) {
    var game = new Game(180, range, 50);
    game.play();
    game.displayResults();
});


