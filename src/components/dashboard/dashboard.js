import React from 'react';
import ActiveCases from './activeCases/activeCases';
import Alerts from './alerts/alerts';
import UpcomingDepositions from './upcomingDepositions/upcomingDepositions';
import './dashboard.scss';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  componentDidMount = () => {
    // console.log('dashboard mount', this.props)
    if(!this.props.loggedIn) return window.location = '/SignIp';

  }
  
  render(){
    // console.log('dashboard render')
    return(
      <div id="dashboard-main">
        <h4>Dashboard</h4>
        <div id="top-dash">
          <UpcomingDepositions userName={this.props.userName} cases={this.props.cases} />
          <Alerts alerts={this.props.alerts} />
        </div>
        <ActiveCases cases={this.props.cases} />
      </div>
    )
  }
}

export default Dashboard;