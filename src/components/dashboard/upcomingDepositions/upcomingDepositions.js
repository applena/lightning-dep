import React from 'react';
import './upcomingDepositions.scss';

class UpcomingDepositions extends React.Component{
  render(){

    // console.log('my props in dashboard:', this.props);
    const upcomingDepositions = [];


    this.props.cases.forEach(file=> {
      upcomingDepositions.push(...file.depositions.filter(deposition => {
        return deposition.isActive === false;
      }))
    })

    let items = [];
    upcomingDepositions.map((deposition, idx) => {
      items.push(
      <li className="flex-container" key={idx}>
        <span className="witness">{deposition.witnessName}</span>
        <span className="schedule">{deposition.date.slice(28)} {new Date(deposition.date).toDateString()}</span>
        <span className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</span>
        <span className="join-button">Join</span>
      </li>);
    })

    return(
      <div id="upcoming-deposition">
          <h4>Upcoming Depositions</h4>
          <div className="flex-container">
            <span>Name</span>
            <span>Schedule</span>
            <span>Court Reporter</span>
            <span> </span>
          </div>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
}

export default UpcomingDepositions;