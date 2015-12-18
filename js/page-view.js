// modules
var React = require('react'),
    ReactDOM = require('react-dom'),
    Datetime = require('react-datetime'),
    $ = require('jquery'),
    LoanInfo = require('./modules/LoanInfo'),
    HistoryInfo = require('./modules/HistoryInfo');

//component goes with capital letter
var ViewApp = React.createClass({

    getInitialState: function () {
        return {
            loan: this.props.loan,
            historyRecords: this.props.loan.history_records
        };
    },

    addHistoryRecord: function () {
        var component = this,
            previousRecord = this.state.historyRecords[this.state.historyRecords.length - 1],
            next = Datetime
                .moment(previousRecord.end_date, dateFormat)
                .add(1, 'weeks')
                .format(dateFormat);


        $.get(baseUrl + '/extend/', {
            'loan_id': this.props.loan.id,
            'end_date': next
        }, function (data) {

            component.setState({
                historyRecords: component.state.historyRecords.concat([
                    {
                        id: data.id,
                        history_record_id: data.id,
                        end_date: next,
                        amount: component.props.loan.amount,
                        start_date: previousRecord.start_date,
                        status: 'Waiting'
                    }
                ])
            });
        });

    },

    render: function () {
        return (
            <div>
                <a className="btn btn-default" href={baseUrl}>Back</a>
                <LoanInfo loan={this.props.loan}/>
                <HistoryInfo onAddHistoryRecord={this.addHistoryRecord} historyRecords={this.state.historyRecords}/>
            </div>
        );
    }
});

ReactDOM.render(
    <ViewApp loan={loan} />,
    document.getElementById('app')
);