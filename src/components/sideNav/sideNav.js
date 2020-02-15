import React from 'react';
import ProfilePic from './profilePic/profilePic';
import MiniAlerts from './miniAlerts/miniAlerts';
import MainSideNav from './mainSideNav/mainSideNav';
import './sideNav.scss'

class SideNav extends React.Component{
  render(){
    return(
      <div id="side-nav">
        <ProfilePic userName={this.props.userName} />
        <MiniAlerts loggOut={this.props.loggOut} />
        <MainSideNav 
          displayAllDepositions={this.props.displayAllDepositions} 
          displayAllCases={this.props.displayAllCases}
        />
      </div>
    )
  }
}

export default SideNav;