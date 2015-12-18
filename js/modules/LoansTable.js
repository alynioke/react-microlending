// modules
var React = require('react'),
    ExistingLoanRow = require('./ExistingLoanRow');

var LoansTable = React.createClass({
    render: function () {
        var loans = [];

        if (this.props.existingLoans.length > 0) {
            this.props.existingLoans.forEach(function (existingLoan, i) {
                loans.push(<ExistingLoanRow index={i} existingLoan={existingLoan} key={i + existingLoan.amount + existingLoan.start_date} />);
            });

            return (
                <table className="table loans-table">
                    <thead>
                        <tr>
                            <th className="table_number">{'#'}</th>
                            <th className="table_amount">Amount</th>
                            <th className="table_date">Return date</th>
                            <th className="table_status">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans}
                    </tbody>
                </table>
            );
        } else {
            return false;
        }
    }
});

module.exports = LoansTable;