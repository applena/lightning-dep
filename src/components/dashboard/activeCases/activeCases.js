import React from 'react';
import './activeCases.scss';

class ActiveCases extends React.Component{
  render(){

    let activeCases = this.props.cases.filter(file => {
      return file.isActive === true;
    })

    let items = [];
    activeCases.map((activeCase, idx) => {
      items.push(<li key={idx}><span className="case-name">{activeCase.name}        </span><span className="case-number">{activeCase.caseNumber}        </span><span className="case-court">{activeCase.court}        </span><span className="case-depositions">{activeCase.depositions.length}</span><span className="more-dots">...</span></li>);
    })

    return(
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
          {items}
        </ul>
      </div>
    )
  }
}

export default ActiveCases;