// modules
var React = require('react'),
    ReactDOM = require('react-dom'),
    Datetime = require('react-datetime'),
    validator = require('validator'),
    $ = require('jquery'),
    Modal = require('react-awesome-modal'),
    NewLoanBlock = require('./modules/NewLoanBlock'),
    LoansTable = require('./modules/LoansTable');

// vars
var tomorrow = Datetime.moment().add(1, 'days').format(dateFormat),
    validationLength = {
        'name': {
            'min': 2,
            'max': 40
        },
        'phone': {
            'min': 5,
            'max': 20
        }
    };

//component goes with capital letter
var App = React.createClass({
    getInitialState: function () {
        return {
            errors: {
                amount: false,
                name: false,
                phone: false,
                iban: false
            },
            amount: '',
            date: tomorrow,
            name: null,
            phone: null,
            iban: null,
            existingLoans: this.props.existingLoans
        };
    },

    handleClientInput: function (newState) {
        this.setState(newState);
    },

    handleSubmit: function () {
        var error = false,
            errors = {
                'amount': false,
                'name': false,
                'phone': false,
                'iban': false
            };
        /*
         * Date can be inputed only via calendar component, so also no need for validation.
         * There is sense in making additional validation of date in php for better security
         * but this wasn't made in the course of this project.
         */

        errors.amount = !validator.isLength(this.state.amount, 1);
        errors.name = !validator.isLength(this.state.name, validationLength.name.min, validationLength.name.max);
        errors.phone = !validator.isLength(this.state.phone, validationLength.phone.min, validationLength.phone.max);
        errors.iban = !validator.isAlphanumeric(this.state.iban);

        error = errors.amount || errors.name || errors.phone || errors.iban;
        /* Permitted IBAN characters are the digits 0 to 9 and the 26 upper-case Latin alphabetic characters A to Z.
         * from: http://www.iso.org/iso/catalogue_detail.htm?csnumber=31531
         */

        this.setState({
            errors: errors
        });


        if (!error) {
            var component = this;

            $.post('/store', {
                'amount': this.state.amount,
                'end_date': this.state.date,
                'name': this.state.name,
                'phone': this.state.phone,
                'iban': this.state.iban
            }, function (data) {
                component.handleResponse(data);
            });

        }
    },

    handleResponse: function (data) {

        if (typeof data.error !== 'undefined') {
            this.setState({
                modalVisible: true
            });
        } else {
            this.setState({
                existingLoans: this.state.existingLoans.concat(
                    [
                        {id: data.id, amount: this.state.amount, end_date: this.state.date, name: this.state.name, phone: this.state.phone, iban: this.state.iban, status: 'Waiting', history_record_id: data.history_record_id}
                    ]
                ),
                amount: '',
                date: tomorrow,
                name: null,
                phone: null,
                iban: null
            });
        }
    },

    closeModal: function () {
        this.setState({
            modalVisible: false
        });
    },

    render: function () {
        return (
            <div className="app">
                <Modal
                visible={this.state.modalVisible}
                width="600"
                height="180"
                effect="fadeInUp">
                    <div className="modal-container">
                        <h1>{'We are sorry, no possibility to take a loan for you now. Try later.'}</h1>
                        <a className="btn btn-default modal-container__close" href="javascript:void(0);" onClick={this.closeModal}>Close</a>
                    </div>
                </Modal>
                <NewLoanBlock validationLength={validationLength} onClientInput={this.handleClientInput} onLoanSubmit={this.handleSubmit} {...this.state} />
                <LoansTable {...this.state} />
            </div>
            );
    }
});

ReactDOM.render(
    <App existingLoans={existingLoans} />,
    document.getElementById('app')
);