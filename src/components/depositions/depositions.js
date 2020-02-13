import React from 'react';
import TimeDropDown from '../library//timeDropDown';
import './depositions.scss';
import If from '../library/If';
import sortBy from '../functional/sortBy';
import OneDeposition from './oneDeposition/oneDeposition';
import { Link } from 'react-router-dom';

class Depositions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      depositionsArray: [],
      upcomingDepositions: [],
      pastDepositions: [],
      visibleDepositionsArray: [],
      items: [],
      oneDeposition: {},
      displayOneSchedule: "",
      displayOneWitnessName: "",
      displayOneRepresentedBy: "",
      displayOneCaseNumber: "",
      displayOneCaseName: "",
      displayOneCourtReporter: "",
      displayOneCaseNumber: "",
      displayOneDepositionNotAttendingPlantiff: [],
      displayOneDepositionNotAttendingDefendent: [],
      displayOnePlantiffLawyers: [],
      displayOneDefendentLawyers: [],
      id: ''
    };
  }

  componentWillMount () {
    const script = document.createElement("script");

    script.src = "https://js.stripe.com/v3/";
    script.async = true;

    document.body.appendChild(script);

    this.props.caseFiles.forEach(file=> {
      this.state.depositionsArray.push(...file.depositions)
    })

    this.updateDepositionArraySorted(this.state.depositionsArray);

  }

  displayOneDep = (idx, id) => {
    this.setState({ id: id })
    let chosenDep = this.state.depositionsArray[idx];
    let courtReporter = `${chosenDep.courtReporter.firstName} ${chosenDep.courtReporter.lastName}`;

    this.setState({ 
      oneDeposition: chosenDep,
      displayOneCourtReporter: courtReporter
    });

    let date = `${chosenDep.date.slice(28)} ${new Date(chosenDep.date).toDateString()}`;

    this.props.caseFiles.forEach(file => {
      const depFiles = file.depositions.filter(dep => dep.id === id)
      if(!depFiles.length){
        return;
      }

      this.setState({ 
        displayOneCaseNumber: file.caseNumber,
        displayOneCaseName: file.name,
        })
    })


    if(!this.state.oneDeposition.documents === 'null'){
      this.setState = ({ displayDocuments: this.state.oneDeposition.documents });
    }


    if(this.state.oneDeposition.exhibits === 'null'){
      this.setState = ({ displayExhibits: this.state.oneDeposition.exhibits });
    }

    this.props.displayOneDeposition();

    this.setState({ 
      displayOneSchedule: date,
      displayOneWitnessName: chosenDep.witnessName
    });

  }

  updateDepositionArraySorted = (array) => {
    this.setState({ visibleDepositionsArray: array })
  }

  displayUpcoming = () => {
    let currentYear = new Date().getYear() + 1900;
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let sortedArray = sortBy('1970-01-01', endDate, 'upcoming', this.state.depositionsArray);
    this.updateDepositionArraySorted(sortedArray);
  }

  displayPast = () => {
    let currentYear = new Date().getYear() + 1900;
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let sortedArray = sortBy('1970-01-01', endDate, 'past', this.state.depositionsArray);
    this.updateDepositionArraySorted(sortedArray);
  }

  createDeposition = () => {
    // link to create deposition
  }

    
  render(){
    console.log('depositions array length', this.state.depositionsArray.length);
    console.log('visible dep array length', this.state.visibleDepositionsArray);

      return(
        <>
          <If condition={this.props.showDepositions}>
            <div id="depositions">
              <h4>Depostions</h4>

              <div className="flex-container dep-top">
                <div className="upcomming-past-toggle">
                  <span onClick={this.displayUpcoming}>Upcoming</span>
                  <span onClick={this.displayPast}>Past</span>
                </div>

                <TimeDropDown 
                  array={this.state.depositionsArray} 
                  sortArray={this.updateDepositionArraySorted}
                />

                <div className="flex-container">
                  <Link to="/createDeposition">Create Deposition</Link>

                  <input type="text" defaultValue="Search"></input>
                </div>

              </div>

              <div className='felx-container'>
                <span>Name</span>
                <span>Schedule</span>
                <span>Court Reporter</span>
                <span>Owner</span>
              </div>
              <ul>
                {this.state.visibleDepositionsArray.map((deposition, idx) => 
                <li onClick={() => this.displayOneDep(idx, deposition.id)} className="flex-container" data-index={idx} key={idx}>
                  <span className="witness">{deposition.witnessName}</span>
                  <span className="schedule">{deposition.date.slice(28)} {new Date(deposition.date).toDateString()}</span>
                  <span className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</span>
                  <span className="owner">owner</span>
                  <span className="more-dots">...</span>
                </li>
                )}
              </ul>
            </div>
          </If>
          <If condition={this.props.showOneDepostion}>
            <OneDeposition
              displayAllDepositions={this.props.displayAllDepositions} 
              oneDeposition={this.state.oneDeposition}
              caseFiles={this.props.caseFiles}
              depId={this.state.id}
              userName={this.props.userName}
              documents={this.state.oneDeposition.documents}
              exhibits={this.state.oneDeposition.exhibits}
            />

          </If>
        </>
    )
  }
}

export default Depositions;