import React from 'react';
import './miniAlerts.scss';
import { Link } from 'react-router-dom';

class MiniAlerts extends React.Component{

  render(){
    return(
      <div id="mini-alerts">
        <ul>
          <li><Link to="/account">Account</Link></li>
          <li>Alerts</li>
          <li><a onClick={this.props.loggOut}>Log Out</a></li>
        </ul>
      </div>
    )
  }
}

export default MiniAlerts;