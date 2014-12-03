var GameDisplay = require('./GameDisplay');

var ranges = require('../data/ranges');
var spins = require('../data/spins');

var Game = function (target, range, start) {
    this.target = target || 60; // Target for total winnings
    this.range = range || 0;    // Choose one of the 6 ranges (0 to 5) to bet on
    this.start = start || 0;    // Start at the first random number unless specified
    this.cashout = this.target; // Store original target value as cashout figure

    // Starting values
    this.divisor = 12;
    this.wager = 5;
    this.result = 0;
    this.progress = 0;

    // Display results
    this.table = new GameDisplay();
    this.table.headers(
        ['Range', 'Target', 'Divisor', 'Bet', 'Spin', 'Result', 'Progress']
    );

    // Track game stats
    this.numbers = [];
    this.losses = 0;
    this.rounds = 0;
};

Game.prototype.play = function () {
    var i = this.start;

    while (this.progress < this.cashout) {
        this.spinTheWheel(i++);
    }
};

Game.prototype.results = function () {
    return JSON.stringify(this.table);
};

Game.prototype.spinTheWheel = function (index) {

    // Grab the next number from the random series
    var spin = spins[index];

    // Remember the number spun
    this.remember(spin);

    // If spin is in the range, add winnings to kitty, otherwise subtract wager
    this.result = ranges[this.range].indexOf(spin) !== -1 ? this.wager * 5 : -this.wager;

    // Add the result to our tally
    this.progress += this.result;

    // Add the results of this spin to our table
    this.table.row([
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

Game.prototype.remember = function (num) {
    this.numbers.push(num);
};

Game.prototype.getNumbers = function () {
    return this.numbers;
};

Game.prototype.roundUpToNearestFive = function (num) {
    return Math.ceil(num / 5) * 5;
};

module.exports = Game;
