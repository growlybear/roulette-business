var Table = require('cli-table');

var ranges = [
    [1,2,3,4,5,6],
    [7,8,9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
    [31,32,33,34,35,36]
];

var spins = require('./data/spins');

var i = 250;
var target = 180;
var cashout = target;
var divisor = 12;
var wager = 5;
var result = 0;
var progress = 0;
var losses = 0;
var rounds = 0;

var spin, collect;

function chooseNewRange(oldRange) {
    // pick an index for the ranges above
    // if the previous range is specified, recurse until a non-colliding value can be returned
    var rand = Math.floor(Math.random() * 6);
    return (oldRange && rand === oldRange) ?
        chooseNewRange(oldRange) : rand;
}

var range = chooseNewRange();

var table = new Table({
    head: ['Range', 'Target', 'Divisor', 'Bet', 'Spin', 'Result', 'Progress']
});

function toNearestFiveCeil(num) {
    return Math.ceil(num / 5) * 5;
}

// Now, play until our cashout target is reached
while (progress < cashout) {

    // Spin the wheel
    spin = spins[i];

    // If spin is in the range, add to kitty, otherwise subtract
    result = ranges[range].indexOf(spin) !== -1 ? wager * 5 : -wager;

    // Add the result to our tally
    progress += result;

    // Display results of this spin
    table.push([
        range + 1, target, divisor, wager, spin, result, progress
    ]);

    // Modify our target to accommodate losses
    target = target - result;

    // Note if this is a winning round
    collect = result > 0;

    // Count successive losses
    losses = collect ? 0 : losses++;

    if (collect) {
        // Modify our stakes if we've had a collect
        divisor = divisor - 2;
    }

    // Modify our wager
    wager = toNearestFiveCeil(target / divisor);

    i++;
}

console.log(table.toString());
