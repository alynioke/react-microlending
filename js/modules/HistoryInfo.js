// modules
var React = require('react'),
    Datetime = require('react-datetime'),
    HistoryRecord = require('./HistoryRecord');

// vars
var loanStatusApproved = 'Approved';

var NewLoanSummary = React.createClass({
    getInitialState: function () {
        return {
            lastStatus: this.props.historyRecords[this.props.historyRecords.length - 1].status
        };
    },

    onAddHistoryRecord: function () {
        if (confirm('Are you sure?')) {
            this.setState({
                lastStatus: 'Waiting'
            });
            this.props.onAddHistoryRecord();
        }
    },

    lastLoanRecordIsApproved: function () {
        return this.state.lastStatus !== loanStatusApproved;
    },

    updateStatus: function (status) {
        this.setState({
            lastStatus: status
        });
    },

    render: function () {
        var historyRecords = [],
            initialEndDate = this.props.historyRecords[0].end_date,
            component = this;

        this.props.historyRecords.forEach(function (historyRecord, i) {
            historyRecords.push(<HistoryRecord onStatusUpdate={component.updateStatus} initialEndDate={initialEndDate} historyRecord={historyRecord} index={i} key={i + historyRecord.id} />);
        });

        return (
            <div className="history-info">
                <h1 className="history-info__h1">Loan history</h1>
                <button
                disabled={this.lastLoanRecordIsApproved()}
                onClick={this.onAddHistoryRecord}
                className="btn btn-default btn-lg history-info__extend">
                    Extend loan
                </button>

                <table className="table history-list">
                    <thead>
                        <tr>
                            <th className="table_number">{'#'}</th>
                            <th className="table_amount">Return date</th>
                            <th className="table_date">Amount to return</th>
                            <th className="table_status">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyRecords}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = NewLoanSummary;