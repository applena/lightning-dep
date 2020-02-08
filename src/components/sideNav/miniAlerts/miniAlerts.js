import React from 'react';
import './miniAlerts.scss';

class MiniAlerts extends React.Component{

  render(){
    return(
      <div id="mini-alerts">
        <ul>
          <li>Account</li>
          <li>Alerts</li>
          <li><a onClick={this.props.loggOut}>Log Out</a></li>
        </ul>
      </div>
    )
  }
}

export default MiniAlerts;