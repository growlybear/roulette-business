/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var ranges = require('../data/ranges');
var spins = require('../data/spins');

var Game = require('./Game');

var Header = require('./ui/Header.react');
var GameNumbers = require('./ui/GameNumbers.react');
var GameConfig = require('./ui/GameConfig.react');

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
            var game = new Game(that.state.target, range, that.state.wager);
            game.play();
            game.setId(range);

            var results = game.results();
            // cf. http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs?lq=1
            var current = that.state.games;
            current.push(results);

            that.setState({ games: current });

            // Get global stats
            var numbers = game.getNumbers();
            if (numbers.length > that.state.numbers.length) {
                // Store only the longest run of numbers (smaller ones will be identical to that point)
                that.setState({ numbers: numbers });
            }
        });
    },
    /**
        <div className="container">
            <Header />
            <GameConfig />
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

                <div className="row">
                    <div className="col-md-7">
                        <GameNumbers series={ this.state.numbers } />
                    </div>
                    <div className="col-md-5">
                        <GameConfig target={ this.state.target } wager={ this.state.wager } start={ this.state.startSpinsAt } />
                    </div>
                </div>

                <ol>
                { this.state.games.map(function (game) {
                    return <li key={ game.id }>{ game }</li>;
                })}
                </ol>

                <Footer />
            </div>
        );
    }
});



React.render(<RouletteApp ranges={ ranges } spins={ spins } />, document.getElementById('app'));
