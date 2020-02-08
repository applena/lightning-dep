import React from 'react';
import './mainSideNav.scss';
import { Link } from 'react-router-dom';

class MainSideNav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return(
        <div id="main-side-nav">
          <ul>
            <li><Link to="/dashboard">
              Dashboard
            </Link></li>
            <li onClick={this.props.displayAllCases}><Link to="/cases">
              Cases
            </Link></li>
            <li onClick={this.props.displayAllDepositions}><Link to="/depositions">
              Depositions
            </Link></li>
          </ul>
        </div>
    )
  }
}

export default MainSideNav;