var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            target: this.props.target,
            wager: this.props.wager,
            start: this.props.start
        };
    },
    render: function () {
        return (
            <div>
              <h4>Game settings:</h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="targetSize">Target</label>
                    <input type="text" className="form-control" id="targetSize" placeholder={ this.state.target } />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="wagerSize">Wager</label>
                    <input type="text" className="form-control" id="wagerSize" placeholder={ this.state.wager } />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="startAt">Start at</label>
                    <input type="text" className="form-control" id="startAt" placeholder={ this.state.start } />
                  </div>
                </div>
              </div>
            </div>
        );
    }
});
