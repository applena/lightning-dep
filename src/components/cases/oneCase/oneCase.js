import React from 'react';
import TimeDropDown from '../../library/timeDropDown';
import '../cases.scss';
import If from '../../library/If';
import sortBy from '../../functional/sortBy';
import CreateDeposition from './createDeposition';
import { Link } from 'react-router-dom';

let backendUrl = "https://lightningdep.azurewebsites.net/api";

class OneCase extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visibleDepArray: [],
      displayInviteModalPlaintiff: false,
      displayInviteModalDefendent: false,
      displayInviteModalParalegalP: false,
      displayInviteModalParalegalD: false,
      displayOneCase: true,
      displayCreateDeposition: false
    }
  }

  componentWillMount = () => {
    this.setState({
      visibleDepArray:this.props.oneCase.depositions,
    })

    this.updateDepArraySorted(this.props.oneCase.depositions)
    
  }

  displayUpcoming = () => {
    let currentYear = new Date().getYear() + 1900;
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let sortedArray = sortBy('1970-01-01', endDate, 'upcoming', this.props.oneCase.depositions);
    this.updateDepArraySorted(sortedArray);
  }

  displayPast = () => {
    let currentYear = new Date().getYear() + 1900;
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let sortedArray = sortBy('1970-01-01', endDate, 'past', this.props.oneCase.depositions);
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

  render(){

    console.log('display create dep', this.state.displayCreateDeposition)
    return(
      <>
      <If condition={this.state.displayOneCase}>
        <div id='one-case'>
          <span onClick={this.props.displayAllCases}>&lt; Cases</span>
          <div className="flex-container" id="one-case-header">
            <div>
              <p>{this.props.oneCase.caseNumber}</p>
              <h2>{this.props.oneCase.name}</h2>
            </div>
            <div>
              <p>{this.props.oneCase.caseType}Case Type</p>
              <p>{this.props.oneCase.exampleCourtName}Court Name</p>
            </div>
          </div>

          <div className="flex-container" id="one-case-details">
            <div className="plaintiff">
              <h5>Plaintiff</h5>
              <h4>{this.props.oneCase.plantiff}</h4>
              <h5>Represented by</h5>
              <ul>
              {this.props.oneCase.plantiffLawyers.map((lawyer, idx) => (
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
              <h4>{this.props.oneCase.defendant}</h4>
              <h5>Represented by</h5>
              <ul>
              {this.props.oneCase.defendentLawyers.map((lawyer, idx) => (
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
                  array={this.props.oneCase.depositions} 
                />
                <input name="search" placeholder="search">
                </input>
                <Link to="/createDeposition">Create Deposition</Link>
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
    </If>

    {/* <If condition={this.state.displayCreateDeposition}>
      <CreateDeposition 
      oneCase={this.props.oneCase}
      displayOneCase={this.displayOneCase} 
    />
    </If> */}
    </>
    )
  }
}

export default OneCase;