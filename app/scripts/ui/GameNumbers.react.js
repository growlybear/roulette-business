var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <h4>Numbers spun:</h4>
                <div className="well">{ this.props.series.join(', ') }</div>
            </div>
        );
    }
});
