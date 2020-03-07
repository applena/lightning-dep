import React from 'react';
import './upcomingDepositions.scss';
import If from '../../../library/If';
import { Link } from 'react-router-dom';
import NextPage from '../../../functional/nextPage';

class UpcomingDepositions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      upcomingDepositions: [],
      visibleDepositions: [],
      index: 0
    };
  }

  componentWillMount = () => {
    console.log('🇵🇷', this.props.cases)
    const upcomingDepositions = [];

    this.props.cases.cases.forEach(file=> {
      upcomingDepositions.push(...file.depositions.filter(deposition => {
        return deposition.isComplete === false;
      }))
    })

    this.setState({ 
      upcomingDepositions: upcomingDepositions,
      visibleDepositions: upcomingDepositions 
    });

    this.props.cases.cases.forEach(file => {
      const depFiles = file.depositions.filter(dep => dep.id === this.props.depId)
      if(!depFiles.length){
        return;
      }
    })
  }

  displayNextPage = () => {
    let nextPage = NextPage(this.state.upcomingDepositions, this.state.index);
    this.setState({
      index: this.state.index + 10,
      visibleDepositions: nextPage
    })
  }

  render(){
    console.log('upcoming deps', this.state.upcomingDepositions)
    return(
      <>
      <If condition={this.props.displayDashboard}>
        <div className="upcoming-deposition">
            <h4>Upcoming Depositions</h4>
            <div className="flex-container">
              <h5>Name</h5>
              <h5>Schedule</h5>
              <h5>Court Reporter</h5>
              <h5> </h5>
            </div>
          <ul>
            {this.state.visibleDepositions.map((deposition, idx) => (
              <Link key={idx} to={`/depositions/${deposition.id}`}>
                <li className="flex-container">  
                  <div className="witness">{deposition.witnessName}</div>
                  <div className="schedule date"> {new Date(deposition.startTime).toDateString()} <br /> {new Date(deposition.date).toDateString()}</div>
                  <div className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</div>
                  <div className="join-button">Join</div>
                </li>
              </Link>
            ))}
          </ul>
          <button onClick={this.displayNextPage}>next</button>
        </div>
      </If>
      </>
    )
  }
}

export default UpcomingDepositions;