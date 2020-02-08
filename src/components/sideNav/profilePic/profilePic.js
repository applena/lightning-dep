import React from 'react';
import './profilePic.scss'

class ProfilePic extends React.Component{
  render(){
    console.log(this.props)
    return(
      <div className="flex">
        <img id="profile-pic" src={this.props.img_url} alt={this.props.userName} />
        <h4 id="profile-name">{this.props.userName}</h4>
      </div>
    )
  }
}

export default ProfilePic;