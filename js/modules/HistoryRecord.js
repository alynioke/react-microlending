// modules
var React = require('react'),
    Datetime = require('react-datetime'),
    $ = require('jquery'),
    Status = require('./Status');

// vars
var percentPerDay = 0.5;

var HistoryRecord = React.createClass({
    calculateReturnAmount: function (extensionTime) {
        var startDate = Datetime.moment(this.props.historyRecord.start_date, dateFormat),
            initialEndDate = Datetime.moment(this.props.initialEndDate, dateFormat),
            diffInDays = Math.ceil(initialEndDate.diff(startDate, 'hours') / 24),
            percentageFromInitialAmount = this.props.historyRecord.amount * diffInDays * percentPerDay / 100;

        return extensionTime === 0
            ? parseFloat((percentageFromInitialAmount + this.props.historyRecord.amount).toFixed(2))
            : parseFloat(((percentageFromInitialAmount * Math.pow(1.5, extensionTime)) + this.calculateReturnAmount(extensionTime - 1)).toFixed(2));
    },

    render: function () {
        var amount = this.calculateReturnAmount(this.props.index);

        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{this.props.historyRecord.end_date}</td>
                <td>{amount + currency}</td>
                <td>
                    <Status {...this.props}/>
                </td>
            </tr>
        );
    }
});

module.exports = HistoryRecord;