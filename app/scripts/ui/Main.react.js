var React = require('react');

module.exports = React.createClass({

    getInitialState: function () {
        return { games: 'some state info' };
    },

    render: function () {
        return (
            <div id="content" className="row marketing">{ this.state.games }</div>
        );
    }
});
