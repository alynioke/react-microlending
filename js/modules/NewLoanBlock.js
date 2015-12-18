var React = require('react'),
    NewLoanForm = require('./NewLoanForm'),
    NewLoanSummary = require('./NewLoanSummary');

var NewLoanBlock = React.createClass({
    render: function () {
        return (
            <div className="new-loan">
                <div>
                    <NewLoanSummary {...this.props} />
                    <h3>{'Apply for a loan'}</h3>
                    <NewLoanForm {...this.props} />
                </div>
            </div>
        );
    }
});

module.exports = NewLoanBlock;