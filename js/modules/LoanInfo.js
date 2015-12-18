// modules
var React = require('react');

var LoanInfo = React.createClass({
    render: function () {
        return (
            <div>
                <h1>{"Loan #" + this.props.loan.id + " info"}</h1>
                <table className="table loanInfo">
                    <tbody>
                        <tr>
                            <td>Loan amount</td>
                            <td>{this.props.loan.amount}</td>
                        </tr>
                        <tr>
                            <td>Date when loan was taken</td>
                            <td>{this.props.loan.start_date}</td>
                        </tr>
                        <tr>
                            <td>Name of the client</td>
                            <td>{this.props.loan.name}</td>
                        </tr>
                        <tr>
                            <td>IBAN</td>
                            <td>{this.props.loan.iban}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{this.props.loan.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = LoanInfo;