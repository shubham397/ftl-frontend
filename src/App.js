import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: "500",
      month: "24",
    };
  }

  componentWillMount() {
    var loanAmount = localStorage.getItem('amount');
    var loanMonth = localStorage.getItem('month');
    if (loanMonth == null) {

    }
    else {
      this.setState({ amount: this.state.amount + "," + loanAmount, month: this.state.month + "," + loanMonth })
    }

  }

  show(event) {
    if (event.target.id === "amountRange") {
      document.getElementById("amountRangeLabel").innerHTML = "Loan Amount - $" + event.target.value;
    }
    else {
      document.getElementById("monthRangeLabel").innerHTML = "Loan Month - " + event.target.value;
    }
  }

  calculate() {
    var loanAmount = document.getElementById("amountRange").value;
    var loanMonth = document.getElementById("monthRange").value;

    this.setState({ amount: this.state.amount + "," + loanAmount, month: this.state.month + "," + loanMonth })

    localStorage.setItem('amount', this.state.amount);
    localStorage.setItem('month', this.state.month);

    axios.get("https://ftl-frontend-test.herokuapp.com/interest?amount=" + loanAmount + "&numMonths=" + loanMonth)
      .then(res => {
        console.log(res);
        document.getElementById("rate").innerHTML = "Interest Rate - " + res.data.interestRate;
        document.getElementById("payment").innerHTML = "Monthly Payment - $" + res.data.monthlyPayment.amount;
      })
      .catch(error => {
        console.log(error);
      });
  }

  calculateFromHistory = ev => {
    var historyAmount = `${ev.currentTarget.dataset.div_amount}`;
    var historyMonth = `${ev.currentTarget.dataset.div_month}`;

    document.getElementById("amountRange").value = historyAmount;
    document.getElementById("monthRange").value = historyMonth;

    document.getElementById("amountRangeLabel").innerHTML = "Loan Amount - $" + historyAmount;
    document.getElementById("monthRangeLabel").innerHTML = "Loan Month - " + historyMonth;

    axios.get("https://ftl-frontend-test.herokuapp.com/interest?amount=" + historyAmount + "&numMonths=" + historyMonth)
      .then(res => {
        console.log(res);
        document.getElementById("rate").innerHTML = "Interest Rate - " + res.data.interestRate;
        document.getElementById("payment").innerHTML = "Monthly Payment - $" + res.data.monthlyPayment.amount;
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    var amount = this.state.amount.split(",");
    var month = this.state.month.split(",");
    return (
      <div className="App">
        <header className="App-header">
          <p>WELCOME</p>
        </header>

        <div className="sidenav">
          <h2>History</h2>
          {amount.length > 0 ?
            amount.map((history, index) => (
              <div
                key={index}
                data-div_amount={history}
                data-div_month={month[index]}
                onClick={this.calculateFromHistory}>
                <label>Loan Amount - {history}</label>
                <label>Loan Month - {month[index]}</label>
                <hr></hr>
              </div>)) : "History"}
        </div>

        <div className="main">
          <label id="amountRangeLabel">Loan Amount - $500</label>
          <div className="slidecontainer">
            <input type="range" min="500" max="5000" className="slider" id="amountRange" onMouseUp={this.calculate.bind(this)} onChange={this.show}></input>
          </div>

          <label id="monthRangeLabel">Loan Month - 24</label>
          <div className="slidecontainer">
            <input type="range" min="6" max="24" className="slider" id="monthRange" onMouseUp={this.calculate.bind(this)} onChange={this.show} ></input>
          </div>

          <label id="rate">Interest Rate - 0.25</label>

          <label id="payment">Monthly Payment - $31</label>
        </div>

      </div>
    );
  }
}

export default App;
