import React from 'react';
import './upcomingDepositions.scss';
import If from '../../library/If';
import OneDeposition from '../../depositions/oneDeposition/oneDeposition';

class UpcomingDepositions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      upcomingDepositions: [],
      displayOneDeposition: false,
      oneDeposition: {},
      depId: ''
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

  displayOneDeposition = (idx, id) => {
    let oneDeposition = this.state.upcomingDepositions[idx];

    this.props.hideDashboard();

    this.setState({ 
      depId: id,
      oneDeposition: oneDeposition, 
      displayOneDeposition: true
    });
  }


  render(){
    console.log('🇸🇭', this.state.depId)
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
              <li onClick={() => this.displayOneDeposition(idx, deposition.id)} className="flex-container" key={idx}>
                <span className="witness">{deposition.witnessName}</span>
                <span className="schedule">{deposition.date.slice(28)} {new Date(deposition.date).toDateString()}</span>
                <span className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</span>
                <span className="join-button">Join</span>
              </li>
            ))}
          </ul>
        </div>
      </If>

      <If condition={this.state.displayOneDeposition}>
        <OneDeposition
          displayAllDepositions={this.props.displayAllDepositions} 
          oneDeposition={this.state.oneDeposition}
          caseFiles={this.props.cases}
          depId={this.state.depId}
          userName={this.props.userName}
          documents={this.state.oneDeposition.documents}
          exhibits={this.state.oneDeposition.exhibits}
        />
      </If>
      </>
    )
  }
}

export default UpcomingDepositions;