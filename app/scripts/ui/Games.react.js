var React = require('react');
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var GameTable = require('./GameTable.react');

module.exports = React.createClass({
    getInitialState: function () {
        return { activeTab: 0 };
    },
    switchTab: function (idx) {
        this.setState({ activeTab: idx })
    },
    render: function () {
        return (
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab="Range 1"><GameTable game={ this.props.games[0] } /></TabPane>
              <TabPane eventKey={2} tab="Range 2"><GameTable game={ this.props.games[1] } /></TabPane>
              <TabPane eventKey={3} tab="Range 3"><GameTable game={ this.props.games[2] } /></TabPane>
              <TabPane eventKey={4} tab="Range 4"><GameTable game={ this.props.games[3] } /></TabPane>
              <TabPane eventKey={5} tab="Range 5"><GameTable game={ this.props.games[4] } /></TabPane>
              <TabPane eventKey={6} tab="Range 6"><GameTable game={ this.props.games[5] } /></TabPane>
            </TabbedArea>
        );
    }
});
