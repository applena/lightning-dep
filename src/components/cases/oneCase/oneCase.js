import React from 'react';
import TimeDropDown from '../../library/timeDropDown';
import '../cases.scss';
import If from '../../library/If';
import sortBy from '../../functional/sortBy';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './oneCase.scss';
import search from '../../functional/search';

let backendUrl = "https://lightningdep.azurewebsites.net/api";

class OneCase extends React.Component{
  constructor(props) {
    super(props);
    // console.log('params for oneCase', this.props)
    const id = this.props.match.params.id;
    // console.log('in one case with id', id)


    const caseFileMatches = this.props.lawyerObj.cases.filter(file => file.case.id == id);

    if(!caseFileMatches.length){ 
      // TODO handle error page
      return
    }
    const caseFile = caseFileMatches[0];


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

    this.state = { oneCase: {
      name: caseFile.case.name,
      caseNumber: caseFile.case.caseNumber,
      caseType: caseFile.case.caseType,
      date: caseFile.case.date,
      isActive: caseFile.case.isActive,
      exampleCourtName: null,
      plantiff: caseFile.plantiff,
      defendant: caseFile.defendant,
      plantiffLawyers: plantiffLawyers,
      defendentLawyers: defendentLawyers,
      depositions: depositionsArray,
    }, visibleDepArray: depositionsArray,
    displayInviteModalPlaintiff: false,
    displayInviteModalDefendent: false,
    displayInviteModalParalegalP: false,
    displayInviteModalParalegalD: false,
    displayOneCase: true,
    displayCreateDeposition: false };
  }

  displayUpcoming = () => {
    let endDate = Date.now();
    let beginning=new Date('1970-01-01')

    let sortedArray = sortBy(beginning, endDate, 'upcoming', this.props.oneCase.depositions);
    this.updateDepArraySorted(sortedArray);
  }

  displayPast = () => {
    let endDate = Date.now();
    let beginning=new Date('1970-01-01')

    let sortedArray = sortBy(beginning, endDate, 'past', this.props.oneCase.depositions);
    this.updateDepArraySorted(sortedArray);
  }

  updateDepArraySorted = (array) => {
    this.setState({ visibleDepArray: array })
  }

  displayInviteModalPlaintiff = () => {
    this.setState({ displayInviteModalPlaintiff: true })
  }

  hideInviteModalPlaintiff = () => {
    this.setState({ displayInviteModalPlaintiff: false })
  }

  displayInviteModalParalegalP = () => {
    this.setState({ displayInviteModalParalegalP: true })
  }

  hideInviteModalParalegalP = () => {
    this.setState({ displayInviteModalParalegalP: false })
  }

  displayInviteModalParalegalD = () => {
    this.setState({ displayInviteModalParalegalD: true })
  }

  hideInviteModalParalegalD = () => {
    this.setState({ displayInviteModalParalegalD: false })
  }

  displayInviteModalDefendent = () => {
    this.setState({ displayInviteModalDefendent: true })
  }

  hideInviteModalDefendent = () => {
    this.setState({ displayInviteModalDefendent: false })
  }

  renderCreateDepPage = () => {
    this.setState({ displayCreateDeposition: true, displayOneCase: false })
  }

  displayOneCase = () => {
    this.setState({ displayCreateDeposition: false, displayOneCase: true })
  }

  inviteLawyer = (e) => {
    let email = e.target.email.value;
    let caseNumber = this.props.oneCase.caseNumber;

    let data = {
      email: email,
      caseNumber: caseNumber
    }

    var request = new XMLHttpRequest();
    request.open('POST', `${backendUrl}/invite/lawyer`, true);
    request.setRequestHeader('Content-Type', "application/json; charset=utf-8");
    request.send(JSON.stringify(data));

    // send a succss or error message
  }

  inviteParalegal = (e) => {
    let email = e.target.email.value;
    let caseNumber = this.props.oneCase.caseNumber;

    let data = {
      email: email,
      caseNumber: caseNumber
    }

    var request = new XMLHttpRequest();
    request.open('POST', `${backendUrl}/invite/paralegal`, true);
    request.setRequestHeader('Content-Type', "application/json; charset=utf-8");
    request.send(JSON.stringify(data));

    // send a succss or error message
  }

  runSearch = (e) => {
    e.preventDefault();
    console.log('this one', this.state.oneCase.depositions)
    let searchResults = search(e, this.state.visibleDepArray);
    this.setState({ visibleDepArray: searchResults })
  }

  render(){

    // console.log('in my one case render', this.state.oneCase, this.state.oneCase.caseNumber)
    return(
      <>
        <div id='one-case'>
          <Link to={`/cases`}>&lt; Cases</Link>
          <div className="flex-container" id="one-case-header">
            <div>
              <p>{this.state.oneCase.caseNumber}</p>
              <h2>{this.state.oneCase.name}</h2>
            </div>
            <div>
              <p>{this.state.oneCase.caseType}Case Type</p>
              <p>{this.state.oneCase.exampleCourtName}Court Name</p>
            </div>
          </div>

          <div className="flex-container" id="one-case-details">
            <div className="plaintiff">
              <h5>Plaintiff</h5>
              <h4>{this.state.oneCase.plantiff}</h4>
              <h5>Represented by</h5>
              <ul>
              {this.state.oneCase.plantiffLawyers.map((lawyer, idx) => (
                <li key={idx}>
                  <span>{lawyer.firstName} {lawyer.lastName}</span>
                </li>
              ))}
                <li onClick={this.displayInviteModalPlaintiff}>+ Invite Lawyer</li>
                <li onClick={this.displayInviteModalParalegalP}>+ Invite Paralegal</li>
              </ul>
            </div>

            <If condition={this.state.displayInviteModalPlaintiff}>
              <div className="invite-modal">
                <span onClick={this.hideInviteModalPlaintiff}>X</span>
                <form onSubmit={this.inviteLawyer}>
                  <input name="email" placeholder="email"></input>
                  <button>Invite</button>
                </form>
              </div>
            </If>

            <If condition={this.state.displayInviteModalParalegalP}>
              <div className="invite-modal">
                <span onClick={this.hideInviteModalParalegalP}>X</span>
                <form onSubmit={this.inviteParalegal}>
                  <input name="email" placeholder="email"></input>
                  <button>Invite</button>
                </form>
              </div>
            </If>


            <div className="defendant">
              <h5>Defendant</h5>
              <h4>{this.state.oneCase.defendant}</h4>
              <h5>Represented by</h5>
              <ul>
              {this.state.oneCase.defendentLawyers.map((lawyer, idx) => (
                <li key={idx}>
                  <span>{lawyer.firstName} {lawyer.lastName}</span>
                </li>
              ))}
                <li onClick={this.displayInviteModalDefendent}>+ Invite Lawyer</li>
                <li onClick={this.displayInviteModalParalegalD}>+ Invite Paralegal</li>
              </ul>
            </div>
        
            <If condition={this.state.displayInviteModalDefendent}>
              <div className="invite-modal">
                <span onClick={this.hideInviteModalDefendent}>X</span>
                <form onSubmit={this.inviteLawyer}>
                  <input name="email" placeholder="email"></input>
                  <button>Invite</button>
                </form>
              </div>
            </If>

            <If condition={this.state.displayInviteModalParalegalD}>
              <div className="invite-modal">
                <span onClick={this.hideInviteModalParalegalD}>X</span>
                <form onSubmit={this.inviteParalegal}>
                  <input name="email" placeholder="email"></input>
                  <button>Invite</button>
                </form>
              </div>
            </If>

            </div>
            <div id="display-one-case-desposition">
              <div id="upcoming-past" className="flex-container">
                <div id="upcoming-past-toggle">
                  <span onClick={this.displayUpcoming}>upcoming</span>
                  <span onClick={this.displayPast}>past</span>
                </div>
                <TimeDropDown 
                  sortArray={this.updateDepArraySorted} 
                  array={this.state.oneCase.depositions} 
                />
                <form onSubmit={this.runSearch}>
                  <input name="search" placeholder="search"></input>
                </form>

                  <Link to={`/createDeposition/${this.state.oneCase.caseNumber}`}>Create Deposition</Link>
              </div>

              <div className="flex-container">
                <span>Name</span>
                <span>Schedule</span>
                <span>Court Reporter</span>
                <span>Owner</span>
                <span></span>
              </div>
              <ul id="dep-list">
                {this.state.visibleDepArray.map((dep, idx) => (
                  <li key={idx}>
                    <span>{dep.name}</span>
                    <span>{dep.date.toLocaleString()}</span>
                    <span>{dep.courtReporter}</span>
                    <span>{dep.owner}</span>
                    <span>...</span>
                  </li>
                ))}
              </ul>
        </div>
      </div>

    </>
    )
  }
}

export default withRouter(OneCase);