import React from 'react';
import TimeDropDown from '../library/timeDropDown';
import './cases.scss';
import If from '../library/If';
import sortBy from '../functional/sortBy';
import OneCase from './oneCase/oneCase';

let backendUrl = "https://lightningdep.azurewebsites.net/api";

class Cases extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visibleCasesArray: [],
      oneCase: this.props.caseFiles[0]
    };
  }

  componentWillMount = () => {
    this.setState({
      visibleCasesArray:this.props.caseFiles,
    })

    this.updateCasesArraySorted(this.props.caseFiles)
    
  }

  updateCasesArraySorted = (array) => {
    this.setState({ visibleCasesArray: array })
  }

  displayOneCase = (idx) => {
    let caseFile = this.props.caseFiles[idx];

    let plantiffLawyers = caseFile.plantiffLawyers.map( lawyer => {
      return({
      firstName: lawyer.firstName,
      lastName: lawyer.lastName,
      firm: lawyer.firm,
      email: lawyer.email
      })
    })

    let defendentLawyers = caseFile.defendentLawyers.map( lawyer => {
      return({
      firstName: lawyer.firstName,
      lastName: lawyer.lastName,
      firm: lawyer.firm,
      email: lawyer.email
      })
    })

    let depositionsArray = caseFile.depositions.map(depo => {
      return({
        name: depo.witnessName,
        date: new Date(`${new Date(depo.date).toDateString()} ${depo.date.slice(28)}`),
        courtReporter: `${depo.courtReporter.firstName} ${depo.courtReporter.lastName}`,
        isActive: depo.isActive,
        owner: 'tbd',
        exhibits: depo.exhibits.map(exhibit => {
          return({
            name: exhibit.name,
            deposition: depo.name,
            exhibitNumber: exhibit.id,
            fileType: 'tbd'
          })
        })
      })
    })

    this.setState({ oneCase: {
      name: caseFile.name,
      caseNumber: caseFile.caseNumber,
      caseType: caseFile.caseType,
      date: caseFile.date,
      isActive: caseFile.isActive,
      exampleCourtName: null,
      plantiff: caseFile.plantiff,
      defendant: caseFile.defendant,
      plantiffLawyers: plantiffLawyers,
      defendentLawyers: defendentLawyers,
      depositions: depositionsArray,
    }, visibleDepArray: depositionsArray })

    this.props.displayOneCase();
  } 

  render(){
    
    console.log('❤️', this.state.visibleCasesArray);
    return(
      <div id="cases">
        <If condition={this.props.showCases}>
          <h4>Cases</h4>
          <button>Create Case</button>
          <div>
            <span>Active</span>
            <span>Past</span>
          </div>
            <TimeDropDown 
              array={this.props.caseFiles} 
              sortArray={this.updateCasesArraySorted}
          />
            <input name="search" placeholder="Search"></input>
        </If>

        <If condition={this.props.showCases}>
          <div id='all-cases'>
            <div className="flex-container headings">
              <span>Name</span>
              <span>Case Number</span>
              <span>Court</span>
              <span>Depositions</span>
              <span></span>
            </div>
            
            <div className="flex-container caseFiles">
              <ul>
              {this.state.visibleCasesArray.map((file, idx) => (
                <li onClick={() => this.displayOneCase(idx)} key={idx}>
                  <span>{file.name}</span>
                  <span>{file.caseNumber}</span>
                  <span>{file.court}</span>
                  <span>{file.depositions.length}</span>
                  <span>...</span>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </If>

        <If condition={this.props.showOneCase}>
          <OneCase
            displayOneCase={this.props.displayOneCase}
            oneCase={this.state.oneCase}
            displayAllCases={this.props.displayAllCases}
          />
        </If>

      </div>
    )
  }
}

export default Cases;