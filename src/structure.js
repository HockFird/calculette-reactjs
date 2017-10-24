import React from 'react';
import { Segment, Label, Icon, Container, Divider, Button } from 'semantic-ui-react'

export class Structure extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first: "",
      operator: null,
      second: "",
      result: null,
      status: "AC"
    };
    this.handleClickReset = this.handleClickReset.bind(this);
  }

  handleClickNumber = (input) => {
    return (evt) => {
      const { operator, first, second } = this.state;
      evt.preventDefault();
      if (operator === null) {
        this.setState({status: "C"});
        if (first.indexOf(".") === -1) {
          this.setState({first: first + String(input)});
        } else if (input !== ".") {
          this.setState({first: first + String(input)});
        }
      } else {
        if (second.indexOf(".") === -1) {
          this.setState({second: second + String(input)});
        } else if (input !== ".") {
          this.setState({second: second + String(input)});
        }
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
      } else if (o === "-" || o === "+") {
        this.setState({first: this.state.first + String(o)});
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
      result: null,
      status: "AC"
    });
  }


  render() {
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(i => {
      return (<span
          key={i}
          className={(i === 0) ? 'center default-btn': 'default-btn'}
        >
          <Button
            basic color="blue"
            value={i}
            onClick={this.handleClickNumber(i)}
            disabled={this.state.result}
          >{i}
          </Button>
          {(i % 3) === 0 ? <br/> : null}
        </span>
      );
    });

    return (
      <Container text textAlign='center'>
      <br />
      <Icon name="calculator" size="huge" color="blue"/>
      <Segment color="blue" size="large">
        <h1>Calculette Fonctionnelle React JS</h1>
        <Divider />
        <Button onClick={this.handleClickReset}className="">{this.state.status}</Button><Button onClick={this.handleClickNumber(".")}className="">.</Button><br/><br/>
        <div className='chiffres'>
          {numbers}
        </div>
        <br />
        <div className='operateurs'>
          <Button value='+' onClick={this.handleClickOperator('+')}>+</Button>
          <Button value='-' onClick={this.handleClickOperator('-')}>-</Button>
          <Button value='/' onClick={this.handleClickOperator('/')}>/</Button>
          <Button value='*' onClick={this.handleClickOperator('*')}>*</Button>
        </div>
        <Divider />
        <div className="egalite">
          <Container className="together" textAlign="center">
            <Label basic color="blue" className='choix1'>{this.state.first}</Label>
            <Label basic color="blue" className='choixOpe'>{this.state.operator}</Label>
            <Label basic color="blue" className='choix2'>{this.state.second}</Label>
          </Container>
          <Divider />
          <Button className="calcul" onClick={this.handleClickEquals}>=</Button>
          {/* <div className='resultat'>{this.state.result}</div>*/}
        </div>
        </Segment>
        </Container>
    );
  }
}
