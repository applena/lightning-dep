import React from 'react';
import './activeCases.scss';
import If from '../../../library/If';
import { Link } from 'react-router-dom';
import NextPage from '../../../functional/nextPage';

class ActiveCases extends React.Component{
  constructor(props) {
    super(props);
    console.log('🙇🏼‍♀️', this.props.cases);
    let activeCases = this.props.cases.cases.filter(file => file.case.isActive === true);
    let visibleCases = activeCases.filter((file, i) => i < 11);

    // this.setState({ 
    //   activeCases: activeCases,
    //   visibleCases: visibleCases
    //  });

    this.state = {
      activeCases: activeCases,
      oneActiveCase: [],
      visibleCases: visibleCases,
      index: 0
    };
  }
  
  displayOneActiveCase = (idx) => {
    let oneActiveCase = this.state.activeCases[idx];

    this.props.displayOneActiveCase(idx);

    this.setState({ 
      oneActiveCase: oneActiveCase,
     });
  }

  displayNextPage = () => {
    let nextPage = NextPage(this.state.activeCases, this.state.index);
    this.setState({ visibleCases: nextPage, index: this.state.index + 10 });
  }

  render(){
    console.log('💁‍♂️', this.state.visibleCases);
    return(
      <div id="active-cases">
        <If condition={this.props.displayDashboard}>
          <div id="active-cases">
            <h4>Active Cases</h4>
            <div className="flex-container">
              <h5>Name</h5>
              <h5>Case Number</h5>
              <h5>Court</h5>
              <h5>Deposition</h5>
              <h5> </h5>
            </div>

            <ul>
              {this.state.visibleCases.map((activeCase, idx) => (
                <Link key={idx} to={`/cases/${activeCase.case.id}`}>
                  <li className="display-table">
                    <div className="case-name">{activeCase.case.name}</div>
                    <div className="case-number">{activeCase.case.caseNumber}</div>
                    <div className="case-court">{activeCase.case.court}</div>
                    <div className="case-depositions">{activeCase.depositions.length}</div>
                    <div className="more-dots">...</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div> 
          <button onClick={this.displayNextPage}>next</button> 
        </If>
      </div>
  )}
}

export default ActiveCases;