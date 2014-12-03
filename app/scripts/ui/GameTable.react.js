var React = require('react');
var Table = require('react-bootstrap').Table;

var TableRow = require('./TableRow.react');

module.exports = React.createClass({
    render: function () {

        var rows = [];
        var cells = [];

        return (
            <Table striped condensed hover>
              <thead>
                <tr>
                  { JSON.parse(this.props.game).data.head.map(function (header, i) {
                        return <th key={ 'header-' + i }>{ header }</th>;
                  }) }
                </tr>
              </thead>
              <tbody>
                  { JSON.parse(this.props.game).data.body.forEach(function (body, i) {
                      cells = [];

                      body.forEach(function (val, j) {
                          cells.push(<td key={ 'body-' + i + 'cell-' + j }>{ val }</td>);
                      })

                      rows.push(<TableRow cells={ cells } />);
                  }) }

                  { rows }
              </tbody>
            </Table>
        );
    }
});
