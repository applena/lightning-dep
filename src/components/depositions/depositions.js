import React from 'react';
import TimeDropDown from '../library//timeDropDown';
import './depositions.scss';
import If from '../library/If';
import sortBy from '../functional/sortBy';
import { Link, Route } from 'react-router-dom';

class Depositions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      depositionsArray: [],
      upcomingDepositions: [],
      pastDepositions: [],
      visibleDepositionsArray: [],
      items: []
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

  displayOneDep = (id) => {
    this.props.setDepId(id);
    // this.props.displayOneDeposition();
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
          <If condition={this.props.displayAllDepositions}>
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
                <li onClick={() => this.displayOneDep(deposition.id)}className="flex-container" data-index={idx} key={idx}>
                  <Link to={`/depositions/${deposition.id}`}>
                    <span className="witness">{deposition.witnessName}</span>
                    <span className="schedule">{deposition.date.slice(28)} {new Date(deposition.date).toDateString()}</span>
                    <span className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</span>
                    <span className="owner">owner</span>
                    <span className="more-dots">...</span>
                  </Link>
                </li>
                )}
              </ul>
              
            </div>
          </If>
        </>
    )
  }
}

export default Depositions;