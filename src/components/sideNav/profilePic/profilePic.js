import React from 'react';
import './profilePic.scss';
import headshot from '../../../assets/headshot-dep.jpg';

class ProfilePic extends React.Component{
  render(){
    console.log(this.props)
    return(
      <div className="flex">
        <img id="profile-pic" src={headshot} alt={this.props.userName} />
        <h4 id="profile-name">{this.props.userName}</h4>
      </div>
    )
  }
}

export default ProfilePic;