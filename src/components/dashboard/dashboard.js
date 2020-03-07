import React from 'react';
import ActiveCases from './lawyer/activeCases/activeCases';
import Alerts from './lawyer/alerts/alerts';
import UpcomingDepositions from './lawyer/upcomingDepositions/upcomingDepositionsLawyer';
import './dashboard.scss';
import If from '../library/If';
import UpcomingDepositionCourtReporter from './courtReporter/upcomingDepositions/upcomingDepositionsCourtReporter';
import TranscriptsToUpload from './courtReporter/transcriptsToUpload/transcriptsToUpload';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    // console.log('dashboard mount', this.props)
    if(!this.props.loggedIn) return window.location = '/SignUp';

    this.state = {
      displayDashboard: true,
      displayOneActiveCase: false
    };
  }

  hideDashboard = () => {
    this.setState({ displayDashboard: false })
  }

  displayDashboard = () => {
    this.setState({ 
      displayDashboard: true
     })
  }

  displayOneActiveCase = () => {
    this.setState({
      displayOneActiveCase: true,
      displayDashboard: false
    })
  }
  
  render(){
    // console.log('the lawyer obj in render of dashboard', this.props.lawyerObj)
    return(
      <div id="dashboard-main">
        <If condition={this.state.displayDashboard}>
          <If condition={this.props.userRole==='lawyer'}>
            <h4>Dashboard</h4>
            <div id="top-dash">
              <UpcomingDepositions 
                userName={this.props.userName} 
                cases={this.props.lawyerObj}
                displayAllDepositions={this.props.displayAllDepositions}
                displayDashboard={this.state.displayDashboard}
                hideDashboard={this.hideDashboard}
                setDepId={this.props.setDepId}
              />
          
              <Alerts 
                alerts={this.props.alerts}
                dismissAllAlerts={this.props.dismissAllAlerts}
                // seeAllAlerts={this.seeAllAlerts}
                />
    
            </div>
          
            <ActiveCases 
              cases={this.props.lawyerObj} 
              displayOneActiveCase={this.displayOneActiveCase}
              displayOneActiveCaseCondition={this.state.displayOneActiveCase}
              displayDashboard={this.state.displayDashboard}
            />
          </If>

          <If condition={this.props.userRole==='courtReporter'}>
            <UpcomingDepositionCourtReporter />
            <TranscriptsToUpload />
            {/* <RecentOrders />  TODO: make this */}
          </If>

        </If>

      </div>
    )
  }
}

export default Dashboard;