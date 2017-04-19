import React from 'react';

import CalcButton from './CalcButton';

function showNotImplemented() {
  console.warn('This function is not implemented yet.');
}

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      lastValue: null,
      op: null,
      lastOp: null,
      lastOp2: null,
      n: false,
    };
    this.numberOnClick = this.numberOnClick.bind(this);
    this.opOnClick = this.opOnClick.bind(this);
    this.calOnClick = this.calOnClick.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  resetState() {
    this.setState({
      value: 0,
      lastValue: null,
      op: null,
      lastOp: null,
      lastOp2: null,
      n: false,
    });
  }

  numberOnClick(e) {
    const number = parseInt(e.target.innerHTML, 10);
    if (this.state.n) {
      this.setState({
        lastValue: this.state.op ? this.state.value : null,
        value: number,
        n: false,
      });
    } else {
      this.setState({ value: this.state.value * 10 + number });
    }
  }

  opOnClick(e) {
    const op = e.target.innerHTML;
    const val = this.calculate();
    this.setState({ value: val, op, n: true });
  }

  calOnClick() {
    if (this.state.op) {
      this.setState({
        lastValue: null,
        value: this.calculate(),
        lastOp: this.state.op || this.state.lastOp,
        lastOp2: this.state.value,
        n: true,
        op: null,
      });
    } else {
      this.setState({ lastValue: null, value: this.calculate(), op: null });
    }
  }
  calculate() {
    if (this.state.lastValue === null && this.state.lastOp === null) {
      return this.state.value;
    }
    let value;
    let op;
    let op2;
    if (this.state.lastValue !== null) {
      value = this.state.lastValue;
      op = this.state.op;
      op2 = this.state.value;
    } else {
      value = this.state.value;
      op = this.state.lastOp;
      op2 = this.state.lastOp2;
    }
    switch (op) {
      case '+':
        value += op2;
        break;
      case '-':
        value -= op2;
        break;
      case 'x':
        value *= op2;
        break;
      case '÷':
        value /= op2;
        break;
      default:
        console.warn('Unknown operator');
    }
    return value;
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.value}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={showNotImplemented}>%</CalcButton>
            <CalcButton onClick={this.opOnClick} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.numberOnClick} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.numberOnClick} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.numberOnClick} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.opOnClick} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.numberOnClick} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.numberOnClick} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.numberOnClick} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.opOnClick} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.numberOnClick} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.numberOnClick} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.numberOnClick} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.opOnClick} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.numberOnClick} className="calc-number bigger-btn">
              0
            </CalcButton>
            <CalcButton onClick={showNotImplemented} className="calc-number">.</CalcButton>
            <CalcButton onClick={this.calOnClick} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
