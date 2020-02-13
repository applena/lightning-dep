import React from 'react';
import ActiveCases from './activeCases/activeCases';
import Alerts from './alerts/alerts';
import UpcomingDepositions from './upcomingDepositions/upcomingDepositions';
import './dashboard.scss';
import If from '../library/If';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayDashboard: true
    };
  }

  componentDidMount = () => {
    // console.log('dashboard mount', this.props)
    if(!this.props.loggedIn) return window.location = '/SignIp';

  }

  hideDashboard = () => {
    this.setState({ displayDashboard: false })
  }

  displayDashboard = () => {
    this.setState({ displayDashboard: true })
  }
  
  render(){
    // console.log('dashboard render')
    return(
      <div id="dashboard-main">
        <h4>Dashboard</h4>
        <div id="top-dash">
          <UpcomingDepositions 
            userName={this.props.userName} 
            cases={this.props.cases}
            displayAllDepositions={this.props.displayAllDepositions}
            displayDashboard={this.state.displayDashboard}
            hideDashboard={this.hideDashboard}
          />
          <If condition={this.state.displayDashboard}>
            <Alerts 
              alerts={this.props.alerts}
            />
          </If>
        </div>
        <If condition={this.state.displayDashboard}>
          <ActiveCases 
            cases={this.props.cases} 
            displayDashboard={this.state.displayDashboard}
          />
        </If>
      </div>
    )
  }
}

export default Dashboard;