import React from 'react';
import './alerts.scss';

class Alerts extends React.Component{
  dismissAll = () => {
    this.props.dismissAllAlerts();
  }

  // seeAllAlerts = () => {
  //   this.props.seeAllAlerts();
  // }

  render(){
    console.log('my alerts in render', this.props.alerts)
    return(
      <div id="alerts">
        <h4>Alerts</h4>
        <div className="flex-container">
          <span>See All</span>
          <span onClick={this.dismissAll}>Dismiss All</span>
        </div>
        <ul>
        {this.props.alerts.map((alert, idx) => (
        <li className="column-flex" key={idx}>
          <span className="alert-title">{alert.title}</span>
          <span className="alert-description">{alert.description}</span></li>
        ))}
        </ul>
      </div>
    )
  }
}

export default Alerts;