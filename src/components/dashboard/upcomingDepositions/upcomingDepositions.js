import React from 'react';
import './upcomingDepositions.scss';
import If from '../../library/If';
import { Link } from 'react-router-dom';

class UpcomingDepositions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      upcomingDepositions: []
    };
  }

  componentWillMount = () => {
    const upcomingDepositions = [];

    this.props.cases.forEach(file=> {
      upcomingDepositions.push(...file.depositions.filter(deposition => {
        return deposition.isActive === false;
      }))
    })

    this.setState({ upcomingDepositions: upcomingDepositions });

    this.props.cases.forEach(file => {
      const depFiles = file.depositions.filter(dep => dep.id === this.props.depId)
      if(!depFiles.length){
        return;
      }
    })
  }

  displayOneDep = (id) => {
    this.props.setDepId(id);
    // this.props.displayOneDeposition();
  }


  render(){
    return(
      <>
      <If condition={this.props.displayDashboard}>
        <div id="upcoming-deposition">
            <h4>Upcoming Depositions</h4>
            <div className="flex-container">
              <span>Name</span>
              <span>Schedule</span>
              <span>Court Reporter</span>
              <span> </span>
            </div>
          <ul>
            {this.state.upcomingDepositions.map((deposition, idx) => (
              <li onClick={() => this.displayOneDep(deposition.id)}className="flex-container" key={idx}>
                <Link to={`/depositions/${deposition.id}`}>
                  <span className="witness">{deposition.witnessName}</span>
                  <span className="schedule">{deposition.date.slice(28)} {new Date(deposition.date).toDateString()}</span>
                  <span className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</span>
                  <span className="join-button">Join</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </If>
      </>
    )
  }
}

export default UpcomingDepositions;