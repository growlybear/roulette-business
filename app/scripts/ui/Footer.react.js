var React = require('react');

module.exports = React.createClass({

    render: function () {
        return (
            <div className="footer">
              <p>Based on the excellent book by Montgomery Charles, <a
                href="//profitableroulette.com/">Make Roulette Your Business
                </a>. True random numbers sourced from <a
                href="//www.random.org/integers/">random.org</a>.
              </p>
            </div>
        );
    }
});
