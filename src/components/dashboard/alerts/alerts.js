import React from 'react';
import './alerts.scss';

class Alerts extends React.Component{
  render(){

    let items = [];
    this.props.alerts.map((alert, idx) => {
      items.push(<li className="column-flex" key={idx}><span className="alert-title">{alert.title}</span><span className="alert-description">{alert.description}</span></li>);
    })

    return(
      <div id="alerts">
        <h4>Alerts</h4>
        <div className="flex-container">
          <span>See All</span>
          <span>Dismiss All</span>
        </div>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
}

export default Alerts;