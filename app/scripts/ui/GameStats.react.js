var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
              <h4>Game stats:</h4>

              <div className="well">
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li><strong>Quickest game:</strong> 53</li>
                      <li><strong>Highest winnings:</strong> 53</li>
                      <li><strong>Average winnings:</strong> 53</li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li><strong>Largest drawdown:</strong> 53</li>
                      <li><strong>Longest losing streak:</strong> 53</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        );
    }
});
