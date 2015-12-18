// modules
var React = require('react'),
    Datetime = require('react-datetime'),
    $ = require('jquery');

// vars
var refreshFrequency = 30000;

var Status = React.createClass({
    getInitialState: function () {
        return {
            status: this.props.historyRecord.status
        };
    },

    componentDidMount: function () {
        var getRecordUrl = baseUrl + '/status/' + this.props.historyRecord.history_record_id,
            component = this,
            interval;

        if (this.state.status === 'Waiting') {
            interval = setInterval(function () {
                $.get(getRecordUrl, function (data) {
                    if (component.isMounted()) {
                        if (data.status === 'Approved' || data.status === 'Rejected') {
                            component.setState({
                                status: data.status
                            });

                            if (typeof component.props.onStatusUpdate !== 'undefined') {
                                component.props.onStatusUpdate(data.status);
                            }

                            clearInterval(interval);
                        }
                    }
                });
            }, refreshFrequency);
        }
    },

    getStatusClass: function () {
        var className;
        switch (this.state.status) {
            case 'Rejected':
                className = 'status_rejected';
                break;
            case 'Approved':
                className = 'status_approved';
                break;
            default:
                className = 'status_waiting';
                break;
        }

        return className;
    },

    render: function () {
        return (
            <span className={this.getStatusClass()}>{this.state.status}</span>
        );
    }
});

module.exports = Status;