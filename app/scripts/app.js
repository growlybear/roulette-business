/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var ranges = require('../data/ranges');
var spins = require('../data/spins');

var Header = require('./ui/Header.react');
var Main = require('./ui/Main.react');
var Footer = require('./ui/Footer.react');

var RouletteApp = React.createClass({

    play: function (ev) {
        window.alert('boo!');
    },

    render: function () {
        return (
            <div className="container">
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
});

React.render(<RouletteApp />, document.getElementById('app'));
