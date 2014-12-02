var React = require('react');

module.exports = React.createClass({

    play: function (ev) {
        window.alert('boo!');
    },

    render: function () {
        return (
            <div className="header">
              <ul className="nav nav-pills pull-right">
                <li className="active">
                  <a href="#" onClick={ this.play }>Play Again</a>
                </li>
              </ul>
              <h3 className="text-muted">Strategic Testing Ground</h3>
            </div>
        );
    }
});
