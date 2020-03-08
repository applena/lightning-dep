import React from 'react';
import If from '../library/If';
import './signUp.scss';
import $ from 'jquery';
import Cookie from 'js-cookie';
var jwt = require('jsonwebtoken');

window.$ = $;

let backendUrl = "https://lightningdep.azurewebsites.net/api";

class SignUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: false,
      roleTab: 'lawyer',
      originalPassword: '',
      confirmPassword: null,
    }
  }

  signUp = (e) => {
    e.preventDefault();
    console.log('🏄🏻', e.target.password.value)

    // universal values
    let firstName = e.target.first.value;
    let lastName = e.target.last.value;
    let email = e.target.email.value;
    let password = this.state.originalPassword;
    let state = e.target.state.value;
    let firm;
    let barNumber;
    let company;
    let accreditation;
    let paralegalFirm;
    let lawyerEmail;

    // lawyer
    if(this.state.roleTab==='lawyer'){
      firm = e.target.firm.value;
      barNumber = e.target.barNumber.value;
    }

    // court reporter
    if(this.state.roleTab==='court reporter'){
      company = e.target.company.value;
      accreditation = e.target.accreditation.value;
    }

    // paralegal
    if(this.state.roleTab==='paralegal'){
      paralegalFirm = e.target.firm.value;
      lawyerEmail = e.target.lawyeremail.value;
    }

    let data = {};
    if(this.state.roleTab==='lawyer'){
      data = {firstName:firstName, lastName:lastName, email:email, password:password, state:state, firm:firm, barNumber:barNumber};
    } else if(this.state.roleTab==='court reporter'){
      data = {firstName:firstName, lastName:lastName, email:email, password:password, state:state, company:company, accreditation:accreditation};
    } else {
      data = {firstName:firstName, lastName:lastName, email:email, password:password, state:state, paralegalFirm:paralegalFirm, lawyerEmail:lawyerEmail};
    }
    console.log('the data object', data)

    var request = new XMLHttpRequest();
    request.open('POST', `${backendUrl}/Register/${this.state.roleTab}`, true);
    request.setRequestHeader('Content-Type', "application/json; charset=utf-8");
    request.onreadystatechange = () => {
      if(request.readyState === 4){
        console.log('🧘‍♂️',request.response)
      };
    }

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send(JSON.stringify(data));




  }

  signIn = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    let data = {email: email, password: password}
    let configs = {
      type: "POST",
      url: `${backendUrl}/SignIn`,
      data: data,
      dataType: "JSON"
    };

    $.ajax( configs )
      .then( data => {
       // if data is bad abort
       // use the jwt library to verify the token and examin the contents
       var decoded = jwt.verify(data.token, 'M8+RgzRV0dN3eHTaPVXycwAk/LrnOPfblsAS96qNmrk=');
       // figure out what keys are in the decoded jwt
       console.log(decoded.foo) // bar

       // call set userName with the username from the jwt
       this.props.updateUserInfo(decoded.userName, decoded.role)

       this.login(data)
     })
  }

  login = (token) => {

    Cookie.set('JWT', token, { secure: true })

    this.getUserName(token);
  }

  updateValue = () => {
    let confirmPassword = document.getElementById('confirm-password').value;
    let originalPassword = document.getElementById('password').value;
    
    this.setState({originalPassword:originalPassword, confirmPassword: confirmPassword});
  }

  showSignIn = () => {
    this.setState({showSignIn:true});
  }

  hideForm = () => {
    this.setState({showSignIn: false})
  }

  updateRoleTab = (role) => {
    this.setState({ roleTab:role });
  }

  render(){
    console.log(this.state.roleTab, "💚", "not logged in")
    return(
      <>
        <div id="container" className={this.state.roleTab}>
          <div id="create-an-account">
            <h2>Create an Account</h2>
              You're about to get access to depositions made easy.

              With Lightning Dep, lawyers can seamlessly hold a deposition, hire and pay court reporters, etc. etc.
          </div>

          <div id="container-sign-up">
            <h2 onClick={() => this.updateRoleTab('lawyer')}>Lawyer</h2>
            <h2 onClick={() => this.updateRoleTab('court reporter')}>Court Reporter</h2>
            <h2 onClick={() => this.updateRoleTab('paralegal')}>Paralegal</h2>
            <div id="sign-up-box">
                <form id="lawyer-signup" onSubmit={this.signUp}>
                  <label>
                    <input name="first" defaultValue="Lena" placeholder="First name" required></input>
                  </label>
                  <label>
                    <input name="last" defaultValue="Eivy" placeholder="Last name" required></input>
                  </label>
                  <label>
                    <input name="email" defaultValue="applena@gmail.com" placeholder="Email" type="emial" pattern=".+@.+\..+" required></input>
                  </label>
                  <label>
                  <input 
                    onChange={this.updateValue}
                    name="password" 
                    id="password" 
                    pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" title="Minimum of 8 characters. Should have at least one special character and one number, one UpperCase Letter, and one LowerCase Letter."
                    type="password" 
                    minLength="8" 
                    placeholder="Password" 
                    required>
                  </input>
                  </label>
                  <label>
                  <input 
                    onChange={this.updateValue}
                    name="password" 
                    id="confirm-password" 
                    pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$" title="Minimum of 8 characters. Should have at least one special character and one number, one UpperCase Letter, and one LowerCase Letter."
                    type="password" 
                    minLength="8" 
                    placeholder="Password" 
                    required>
                  </input>
                  </label>
                  <If condition={this.state.originalPassword !== this.state.confirmPassword}>
                    <div>Passwords Do Not Match</div>
                  </If>

                  <If condition={this.state.roleTab==='lawyer'}>
                    <label>
                      <input name="paralegal" placeholder="Paralegal" type="email" defaultValue="paralegal@para.com" pattern=".+@.+\..+"></input>
                    </label>
                    <label>
                      <input name="firm" defaultValue="Firm" placeholder="Firm" required></input>
                    </label>
                    <label>
                      <input id="bar" defaultValue="25" name="barNumber" placeholder="Bar Number" required></input>
                    </label>
                  </If>

                  <If condition={this.state.roleTab==='court reporter'}>
                    <label>
                      <input name="company" placeholder="Company" required></input>
                    </label>
                    <label>
                      <input id="bar" name="accreditation" placeholder="Accreditation" required></input>
                    </label>
                  </If>

                  <If condition={this.state.roleTab==='paralegal'}>
                    <label>
                      <input name="firm" placeholder="Firm" required></input>
                    </label>
                    <label>
                      <input id="bar" name="lawyeremail" placeholder="lawyer email" required></input>
                    </label>
                  </If>

                  <label id="state" htmlFor="state" placeholder="State" required></label>
                  <select id="state">
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                  <label>
                    <br />
                  <input id="term-and-conditions" type="checkbox" name="termsAndConditions" value="termsAndConditions" required></input>I agree to the <span>terms and conditions</span>
                  </label>
                  <button>Sign Up</button>
                </form>

                <button id="sign-in" onClick={this.showSignIn}>Already have an account? <span className="underline">Sign In</span></button>

                <If condition={this.state.showSignIn}>
                  <form id="sign-in-form" onSubmit={this.signIn}>
                  <div id="close" onClick={this.hideForm}>X</div>
                    <label>
                      <input name="email" placeholder="Email" type="emial" pattern=".+@.+\..+" required></input>
                    </label>
                    <label>
                      <input 
                        onChange={this.updateValue}
                        id="password" 
                        pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$" title="Minimum of 8 characters. Should have at least one special character and one number, one UpperCase Letter, and one LowerCase Letter."
                        name="password" 
                        type="password" 
                        minLength="8" 
                        placeholder="Password" 
                        required>
                      </input>
                    </label>
                    <label>
                      <input 
                        onChange={this.updateValue}
                        id="confirm-password" 
                        pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$" title="Minimum of 8 characters. Should have at least one special character and one number, one UpperCase Letter, and one LowerCase Letter."
                        name="password" 
                        type="password" 
                        minLength="8" 
                        placeholder="Password" 
                        required>
                      </input>
                    </label>
                    <If condition={this.state.originalPassword !== this.state.confirmPassword}>
                      <div>Passwords Do Not Match</div>
                    </If>
                    <button>Sign In</button>
                  </form>
                </If>
              </div>
            </div>
          </div>
      </>
    )
  }
}

export default SignUp;
