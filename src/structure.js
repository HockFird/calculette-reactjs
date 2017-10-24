import React from 'react';

export class Structure extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first: "",
      operator: null,
      second: "",
      result: null
    };
    this.handleClickReset = this.handleClickReset.bind(this);
  }

  handleClickNumber = (input) => {
    return (evt) => {
      const { operator, first, second } = this.state;
      if (operator === null) {
        evt.preventDefault();
        this.setState({first: first + String(input)});
      } else {
        evt.preventDefault();
        this.setState({second: second + String(input)});
      }
    }
  }


  handleClickOperator = (o) => {
    return (evt) => {
      evt.preventDefault();
      if (this.state.first !== "") {
        if (this.state.result === null) {
          this.setState((operator) => {
            return {operator: o};
          });
        } else {
          this.setState({operator: o}, function () {
            this.handleClickEquals()
          });
        }
      }
    }
  }

  handleCalculation = (first, second, operator) => {
    let result = '';
    switch(operator) {
      case '+':
        result = parseFloat(first, 10) + parseFloat(second, 10);
        break;
      case '-':
        result = parseFloat(first, 10) - parseFloat(second, 10);
        break;
      case '/':
        result = parseFloat(first, 10) / parseFloat(second, 10);
        break;
      case '*':
        result = parseFloat(first, 10) * parseFloat(second, 10);
        break;
      default:
        result= '';
    }

    return result
  }

  handleClickEquals = () => {
    const { operator, first, second } = this.state;
    const resultFinal = this.handleCalculation(first, second, operator);
      this.setState({
        first: resultFinal ,
        operator: null,
        second: "",
        result: null
      });
  }

  handleClickReset() {
    this.setState({
      first: "",
      operator: null,
      second: "",
      result: null
    });
  }


  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(i => {
      return (<span
          key={i}
          className={(i === 0) ? 'center default-btn': 'default-btn'}
        >
          <button
            value={i}
            onClick={this.handleClickNumber(i)}
            disabled={this.state.result}
          >{i}
          </button>
          {(i % 3) === 0 ? <br/> : null}
        </span>
      );
    });

    return (
      <div>
        <h1>Calculette Fonctionnelle React JS</h1>
        <button onClick={this.handleClickReset}className="">AC</button><button onClick={this.handleClickNumber(".")}className="">.</button><br/><br/>
<br/><br/>
        <div className='chiffres'>
          {numbers}
        </div>
        <br/>
        <div className='operateurs'>
          <button value='+' onClick={this.handleClickOperator('+')}>+</button>
          <button value='-' onClick={this.handleClickOperator('-')}>-</button>
          <button value='/' onClick={this.handleClickOperator('/')}>/</button>
          <button value='*' onClick={this.handleClickOperator('*')}>*</button>
        </div>
        <br />
        <div className="egalite">
          <div className="together">
            <div className='choix1'>{this.state.first}</div>
            <div className='choixOpe'>{this.state.operator}</div>
            <div className='choix2'>{this.state.second}</div>
          </div>
          <button className="calcul" onClick={this.handleClickEquals}>=</button>
          {/* <div className='resultat'>{this.state.result}</div>*/}
        </div>
      </div>
    );
  }
}
