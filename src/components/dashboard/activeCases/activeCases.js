import React from 'react';
import './activeCases.scss';
import If from '../../library/If';
import OneActiveCase from './oneActiveCase/oneActiveCase';

class ActiveCases extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeCases: [],
      oneActiveCase: [],
      displayDashboard: true,
      displayOneActiveCase: false
    };
  }

  componentWillMount = () => {
    let activeCases = this.props.cases.filter(file => {
      return file.isActive === true;
    })

    this.setState({ activeCases: activeCases });
  }
  
  displayOneActiveCase = (idx) => {
    let oneActiveCase = this.state.activeCases[idx];
    this.setState({ oneActiveCase: oneActiveCase });
  }

  render(){

    return(
      <div id="active-cases">
        <If condition={this.state.displayDashboard}>
          <div id="active-cases">
            <h4>Active Cases</h4>
            <div className="flex-container">
              <span>Name</span>
              <span>Case Number</span>
              <span>Court</span>
              <span>Deposition</span>
              <span> </span>
            </div>

            <ul>
              {this.state.activeCases.map((activeCase, idx) => (
                <li onClick={() => this.displayOneActiveCase(idx)} key={idx}>
                  <span className="case-name">{activeCase.name}        </span>
                  <span className="case-number">{activeCase.caseNumber}        </span>
                  <span className="case-court">{activeCase.court}        </span>
                  <span className="case-depositions">{activeCase.depositions.length}</span>
                  <span className="more-dots">...</span>
                </li>
              ))}
            </ul>
          </div>  
        </If>

        <If condition={this.state.displayOneActiveCase}>
          <OneActiveCase />
        </If>
      </div>
  )}
}

export default ActiveCases;