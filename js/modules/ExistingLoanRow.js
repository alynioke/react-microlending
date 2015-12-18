// modules
var React = require('react'),
    Status = require('./Status');

var ExistingLoanRow = React.createClass({
    getInitialState: function () {
        return {
            status: this.props.existingLoan.status
        };
    },

    render: function () {
        var historyRecord = {
            status: this.props.existingLoan.status,
            history_record_id: this.props.existingLoan.history_record_id
        };

        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>
                    <a href={baseUrl + '/view/' + this.props.existingLoan.id}>{this.props.existingLoan.amount + currency}</a>
                </td>
                <td>{this.props.existingLoan.end_date}</td>
                <td>
                    <Status historyRecord={historyRecord}/>
                </td>
            </tr>
        );
    }
});

module.exports = ExistingLoanRow;