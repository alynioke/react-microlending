// modules
var React = require('react'),
    Datetime = require('react-datetime');

// vars
var percentPerDay = 0.5;

var NewLoanSummary = React.createClass({
    calculateReturnAmount: function () {
        var today = Datetime.moment(),
            loadLastDay = Datetime.moment(this.props.date, dateFormat),
            diffInDays = Math.ceil(loadLastDay.diff(today, 'hours') / 24);
        //had to make diff in hours first, not in days, bc 23 hours are being count as 0 days, even though on calendar it's 1 day

        return (parseFloat(this.props.amount, 2) * (diffInDays * percentPerDay) / 100) + parseFloat(this.props.amount, 2);
    },

    render: function () {
        var returnAmount = this.calculateReturnAmount();
        var returnBlockClass = (this.props.amount === '' || this.props.date === '') ? '_hide' : '_show';
        return (
            <table className="table summary">
                <thead>
                    <tr>
                        <th className="table_number">New</th>
                        <th className="table_amount">Amount</th>
                        <th className="table_date">Return date</th>
                        <th className="table_return">Return amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>{this.props.amount}{currency}</td>
                        <td>{this.props.date}</td>
                        <td>
                            <span className={returnBlockClass}>{returnAmount}{currency}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

module.exports = NewLoanSummary;