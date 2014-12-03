var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <tr>{ this.props.cells }</tr>
        );
    }
});
