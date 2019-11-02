# Assignment

## Problem Statement

Design and implement a user interface that allows a user to enter a loan amount and  loan duration in months which then displays the interest rate and the monthly payment.

The user must be able to enter (at least) the monetary amount by using a slider.  

The calculated values should automatically update as the slider is used -without requiring any further interaction by the user.

Cache the recent input values in localstorage and Implement a sidebar which has the history of the loan-amount and duration combinations used before and upon clicking on which the input fields shall be populated and the result is obtained.

The loan amount should be between $500 and $5000 and the loan duration between 6 and 24 months.

You should use the following API - https://ftl-frontend-test.herokuapp.com/interest?
amount={amount}&numMonths={numMonths}

## Solution

There is one single page which consists of two component

* SideBar
* Interest Calculator 

When ever we calculate interest rate that value is store in local storage and is displayed in sidebar.when we click on any item in side bar that value is displayed in interest calculator and interest rate is calculated.

By the help of axios we are getting interest rate and monthly payment.

### sidebar

It consist of one parent div and many child div in each child div there is 3 things 

* label to display loan amount
* label to display loan month
* horizontal bar to separate two div 

```html
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
```

### Interest Calculator

It consist of one parent div and inside that parent div there are 6 things 

* label to display loan amount.
* Range selector for loan amount.
* label to display loan month.
* Range selector for loan month.
* label to show interest rate.
* label to show monthly payment. 

```html
<div className="main">
    <label id="amountRangeLabel">Loan Amount - $500</label>
    <div className="slidecontainer">
        <input type="range" min="500" max="5000" className="slider" id="amountRange" onMouseUp={this.calculate.bind(this)} onChange={this.show}></input>
    </div>

    {/*Label & Range Month*/}
    <label id="monthRangeLabel">Loan Month - 24</label>
    <div className="slidecontainer">
        <input type="range" min="6" max="24" className="slider" id="monthRange" onMouseUp={this.calculate.bind(this)} onChange={this.show} ></input>
    </div>

    {/* Interest Rate*/}
    <label id="rate">Interest Rate - 0.25</label>

    {/*Monthly Payment */}
    <label id="payment">Monthly Payment - $31</label>
</div>
```

