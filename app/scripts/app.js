/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var ranges = require('../data/ranges');
var spins = require('../data/spins');

var Game = require('./Game');

var Header = require('./ui/Header.react');
var Main = require('./ui/Main.react');
var Footer = require('./ui/Footer.react');

var RouletteApp = React.createClass({
    getDefaultProps: function () {
        return {
            ranges: ranges,     // Range of 6 numbers to play (1-6, 2-12, etc.)
            spins: spins        // Random number data
        };
    },
    getInitialState: function () {
        return {
            target: 60,
            range: 0,
            wager: 5,
            startSpinsAt: 0,    // Starting point in our 10,000 random number array
            games: [],
            numbers: []
        };
    },
    componentWillMount: function () {
        var that = this;

        // Play a game for each range and store the results in state
        [0,1,2,3,4,5].forEach(function (range) {
            // Get results for each game
            var game = new Game(that.state.target, that.state.range, that.state.wager);
            game.play();

            that.setState({games: that.state.games.concat([game.results()])});

            // Get global stats
            var numbers = game.getNumbers();
            if (numbers.length > that.state.numbers.length) {
                that.setState({ numbers: numbers });
            }
        });
    },
    /**
        <div className="container">
            <Header />
            <GameNumbers />
            <GameStats />
            <Games />
            <Footer />
        </div>
    */
    render: function () {
        return (
            <div className="container">
                <Header />
                { this.state.games }
                <p className="bg-success">{ this.state.numbers }</p>
                <Footer />
            </div>
        );
    }
});



React.render(<RouletteApp ranges={ ranges } spins={ spins } />, document.getElementById('app'));
