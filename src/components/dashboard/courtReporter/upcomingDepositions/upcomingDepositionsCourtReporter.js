import React from 'react';
import '../../lawyer/upcomingDepositions/upcomingDepositions.scss';
import { Link } from 'react-router-dom';


class UpcomingDepositionCourtReporter extends React.Component{
  constructor(props) {
    // TODO: loop through the cases object and make an array of the upcoming depositions named upcomingDepositions in state
    super(props);
    this.state={
      upcomingDepositions: []
    }
  }
  render(){
    return(
      <div className="upcoming-deposition">
      <h4>Upcoming Depositions</h4>
      <div className="flex-container">
        <h5>Name</h5>
        <h5>Schedule</h5>
        <h5>Scheduling Lawyer</h5>
        <h5><button>Join</button></h5>
      </div>
      <ul>
        {this.state.upcomingDepositions.map((deposition, idx) => (
          <Link to={`/depositions/${deposition.id}`}>
            <li className="flex-container" key={idx}>  
              <div className="witness">{deposition.witnessName}</div>
              <div className="schedule date">{deposition.date.slice(28)} <br /> {new Date(deposition.date).toDateString()}</div>
              <div className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</div>
              <div className="join-button">Join</div>
            </li>
          </Link>
        ))}
      </ul>
      </div>
    )
  }
}

export default UpcomingDepositionCourtReporter;