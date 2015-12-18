// modules
var React = require('react'),
    Datetime = require('react-datetime'),
    ReactTooltip = require("react-tooltip"),
    moment = require('moment'),
    validator = require('validator');

// vars
var moneyLimit = 500; //amount, in EUR

var NewLoanForm = React.createClass({
    handleChange: function (name, e) {
        var error = false,
            value = (name === 'date') ? e.format(dateFormat) : e.target.value;

        /*
         * On input we validate only amount because it's the field which is participating in calculations on the fly
         * (return amount in the summary block is calculated based on it). Other fields will be validated on submit.
         */
        if (name === 'amount' && !validator.isInt(value, {min: 1, max: moneyLimit}) && value !== '') {
            error = true;
        }

        if (!error) {
            var newState = {};
            newState[name] = value;
            this.props.onClientInput(newState);
        }
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.props.onLoanSubmit();
    },

    render: function () {
        var now = Datetime.moment(),
            limit = Datetime.moment().add(2, 'months'),
            amountClass = this.props.errors.amount === true ? " has-error" : "",
            nameClass = this.props.errors.name === true ? " has-error" : "",
            phoneClass = this.props.errors.phone === true ? " has-error" : "",
            ibanClass = this.props.errors.iban === true ? " has-error" : "",
            isValidDate = function (currentDate) {
                return currentDate.isAfter(now) && currentDate.isBefore(limit);
            };

        return (
            <form className="new-loan-form">
                <div className={"new-loan-form__element" + amountClass}>
                    <input
                    data-tip={"You are able to take maximum of " + moneyLimit + " euros for 2 months"}
                    onChange={this.handleChange.bind(this, 'amount')}
                    value={this.props.amount}
                    placeholder="Amount"
                    name="amount"
                    data-for="amount"
                    className="form-control new-loan-form__field" />
                    <ReactTooltip place="top" type="warning" effect="solid" id="amount"/>
                </div>

                <Datetime
                className="new-loan-form__element"
                input={false}
                open={true}
                isValidDate={isValidDate}
                timeFormat={false}
                dateFormat={dateFormat}
                onChange={this.handleChange.bind(this, 'date')}
                defaultValue={Datetime.moment().add(1, 'days').format(dateFormat)}
                value={this.props.date}
                name="date"/>


                <div className={"new-loan-form__element" + nameClass}>
                    <input
                    data-tip={"Name should be minimum " + this.props.validationLength.name.min
                        + " and maximum " + this.props.validationLength.name.max + " characters"}
                    data-for="name"
                    onChange={this.handleChange.bind(this, 'name')}
                    value={this.props.name}
                    placeholder="Name"
                    name="name"
                    className="form-control new-loan-form__field" />
                    <ReactTooltip place="top" type="warning" effect="solid" id="name"/>
                </div>

                <div className={"new-loan-form__element" + phoneClass}>
                    <input
                    data-tip={"Phone number should be minimum " + this.props.validationLength.phone.min
                        + " and maximum " + this.props.validationLength.phone.min
                        + " characters"}
                    data-for="phone"
                    onChange={this.handleChange.bind(this, 'phone')}
                    value={this.props.phone}
                    placeholder="Phone"
                    name="phone"
                    className="form-control new-loan-form__field"  />
                    <ReactTooltip place="top" type="warning" effect="solid" id="phone"/>
                </div>

                <div className={"new-loan-form__element" + ibanClass}>
                    <input
                    data-tip="IBAN can consit of digits 0 to 9 and alphabetic characters A to Z."
                    data-for="iban"
                    onChange={this.handleChange.bind(this, 'iban')}
                    value={this.props.iban}
                    placeholder="iBan"
                    name="iban"
                    className="form-control new-loan-form__field"  />
                    <ReactTooltip place="top" type="warning" effect="solid" id="iban"/>
                </div>

                <button className="btn btn-default" type="submit" onClick={this.handleSubmit}>Apply</button>
            </form>
            );
    }
});

module.exports = NewLoanForm;