import React from 'react';
import '../cases.scss';
import $ from 'jquery';
import If from '../../library/If';
import { withRouter } from "react-router";

let backendUrl = "https://lightningdep.azurewebsites.net/api";

class CreateDeposition extends React.Component{
  
  constructor(props) {
    super(props);

    const caseNumber = this.props.match.params.caseNum;

    console.log('😈', caseNumber, this.props.match.params)
    // load in all the court reporters so that user can do a fuzzy search
    // cr should be an array of names: ['Janelle Reporter']
    $.getJSON(`${backendUrl}/courtReporters`, function(cr) {
      this.setState({ courtReporters: cr, visibleCRArray: cr });
    })

    this.state = {
      caseNumber: caseNumber,
      courtReporters: [],
      displayFuzzySearch: false,
      visibleCRArray: []
    }
  }

  createDeposition = (e) => {
    e.preventDefault();

    let witness = e.target.witness.value;
    let caseNumber = e.target.caseNumber.value;
    let witnessLawyer = e.target.witnessLawyer.value;
    let courtReporter = e.target.courtReporter.value || null;
    let startTime = e.target.startTime.value || null;
    let endTime = e.target.endTime.value || null;
    let date = e.target.date.value || null;

    let data = {
      caseNumber: caseNumber,
      witness: witness,
      witnessLawyer: witnessLawyer,
      courtReporter: courtReporter,
      startTime: startTime,
      endTime: endTime,
      date: date
    }

    var request = new XMLHttpRequest();
    request.open('POST', `${backendUrl}/deposition`, true);
    request.setRequestHeader('Content-Type', "application/json; charset=utf-8");
    request.send(JSON.stringify(data));
  }

  searchCourtReporters = (e) => {
    this.setState({ displayFuzzySearch: true })
    let name = e.target.courtReporter.value;

    let visibleCRArray = this.state.courtReporters.filter(cr => cr.includes(name));

    this.setState({ visibleCRArray: visibleCRArray });
  }

  render(){
    return(
      <div id="create-deposition">
        <form onSubmit={this.createDeposition}>
        <h3>Create Deposition</h3>
          <label>Case Number
            <input type="text" name="caseNumber" placeholder={this.state.caseNumber} defaultValue={this.state.caseNumber} required></input>
          </label>

          <label>Witness
            <input type="text" name="witness" required></input>
          </label>

          <label>Witness Lawyer
            <input type="text" name="witnessLawyer" required></input>
          </label>

          <label>Court Reporter
            <input onChange={this.searchCourtReporters} type="text" name="courtReporter"></input>
          </label>

          <If condition={this.state.displayFuzzySearch}>
            <ul>
            {this.state.visibleCRArray.map((cr, idx) => (
              <li key={idx}>
                {cr}
              </li>
            ))}
              <li>
                Can't find who you're looking for? Add their email address and "enter" to invite them to Lightning Lawyers. 
              </li>
            </ul>
          </If>

          <label className="small">Start Time
            <input type="time" name="startTime"></input>
          </label>

          <label className="small">Est. End Time
            <input type="time" name="endTime"></input>
          </label>

          <label className="small">Date
            <input type="date" name="date"></input>
          </label>

          <button id="save-button">Save</button>
        </form>
        
        <button onClick={this.props.displayOneCase}>Cancel</button>
      </div>
    )
  }
}

export default withRouter(CreateDeposition);