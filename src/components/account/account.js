import React from 'react';
import logo from '../../assets/logo.jpg';
import profileUrl from '../../assets/headshot-dep.jpg';
import './account.scss';

class Account extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      logoUrl:'',
      imageUrl:''
    };

    this.setState({ logoUrl: logo, imageUrl: profileUrl })
  }

  render(){
    console.log('render accounts props', this.props);
    return(
      <div id="account-top" className="flex-container">
        <div id="profile-imgs">
          <img src={logo} />
          <img src={profileUrl} />
        </div>
        <h2>{this.props.userName}</h2>
      </div>
    )
  }
}

export default Account;