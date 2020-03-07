import React from 'react';
import './App.scss';
import $ from 'jquery';
import Layout from './components/layout/layout';
import SignUp from './components/signup/signUp';
import Cookie from 'js-cookie';
import If from './components/library/If';
import SideNav from './components/sideNav/sideNav';
import Dashboard from './components/dashboard/dashboard';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Cases from './components/cases/cases';
import Depositions from './components/depositions/depositions';
import CreateDeposition from './components/cases/oneCase/createDeposition'; 
import OneDeposition from './components/depositions/oneDeposition/oneDeposition';
import OneCase from './components/cases/oneCase/oneCase'; 
import Account from './components/account/account';


class App extends React.Component{
  constructor(props) {
    super(props);
    // use jsonwebtoken library to examine the JWT COOKIE, see if it is valid and get the username out of it
    // const loggedIn = !!Cookie.get('JWT');
    const loggedIn = false;
    console.log('🥉',Cookie.get('JWT'));

    let alerts = [{title: 'New Document Available', description: '3;17-cv-0019087'}, {title: 'Deposition Transcript Available', description: 'Jane Doe'}, {title: 'Deposition Transcript Available', description: 'John Doe'}]

    if(!Cookie.get('JWT')){
      this.state = {loggedIn: false}
    } else { 
      this.state = { loggedIn: true }
       this.getCaseObject();
    }
    this.state = {
      loggedIn: loggedIn,
      userName: 'Jane Lawyer', // TODO: get this username from the JWT cookie
      userRole: 'lawyer', //TODO: get this info from the JWT cookie in the signUp.js
      showDepositions: true,
      showOneDepostion: false,
      oneCaseNumber: '',
      alerts: alerts,
      backendUrl: 'https://lightningdep.azurewebsites.net',
      caseObj:{},
      haveData: false
    };

    this.getCaseObject();

  }

  loggedOut = () => {
    Cookie.set('JWT', null);
    this.setState({loggedIn: false});
  }

  updateUserInfo = (userName, role) => {
    this.setState({ 
      userName: userName,
      userRole: role
     });
  }

  displayAllDepositions = () => {
    this.setState({ 
      showDepositions: true,
      showOneDepostion: false
     })
  }

  setOneCaseNumber = (num) => {
    this.setState({ oneCaseNumber: num });
  }

  dismissAllAlerts = () => {
    this.setState({ alerts: [] })
  }

  // makes a call to get get the giant object that contains the user data and case info
  getCaseObject = () => {
    let backendUrl = `${this.state.backendUrl}/api/Dashboard?id=1&role=${this.state.userRole}`;
    $.ajax(backendUrl, {method: 'GET', dataType: 'JSON'})
      .then(data => {
        this.setState({ 
          caseObj: data,
          haveData: true
         });
      })
  }

  // seeAllAlerts = () => {
  //   this.setState({ alerts: 'new alerts will go here' })
  // }


  render(){
  console.log('app render')
  console.log('am I logged in', this.state.loggedIn)
    return (
      <HashRouter basename='/'>
        <div className="App">
          <Layout>
            <If condition={!this.state.loggedIn}>
              <SignUp updateUserInfo={this.updateUserInfo} />
            </If>
            <If condition={this.state.loggedIn && this.state.haveData}>
              <div id="dashboard">
                <SideNav 
                  loggOut={this.loggedOut} 
                  userName={this.state.userName}
                  userRole={this.state.userRole}
                  displayAllDepositions={this.displayAllDepositions}
                  displayAllCases={this.displayAllCases}
                />
                <Switch>
                  <Route path="/createDeposition/:caseNum" render={(props) => <CreateDeposition {...props}
                  />}/>
                  <Route path="/createDeposition" render={(props) => <CreateDeposition {...props}
                  />}/>
              
                  <Route path="/depositions/:id" render={(props) => <OneDeposition {...props}
                    displayAllDepositions={this.props.displayAllDepositions} 
                    lawyerObj={this.state.caseObj}
                    depId={this.state.depId}
                    userName={this.state.userName}
                  />}/>
                  <Route path="/depositions" render={(props) => <Depositions {...props} 
                    userName={this.state.userName}
                    lawyerObj={this.state.caseObj} 
                    displayAllDepositions={this.displayAllDepositions}
                    showDepositions={this.state.showDepositions}
                    showOneDepostion={this.state.showOneDepostion}
                  />} />
                  <Route path="/cases/:id" render={(props) => <OneCase {...props}
                    caseId={this.state.oneCaseId}
                    lawyerObj={this.state.caseObj}
                  />}/>
                  <Route path="/cases" render={(props) => <Cases {...props}
                    userName={this.state.userName}
                    lawyerObj={this.state.caseObj}
                    displayAllCases={this.displayAllCases}
                  />}/>
                  <Route path="/account" render={(props) => <Account {...props}
                    lawyerObj={this.state.caseObj}
                    userName={this.state.userName}
                  /> }
                  />
                  <Route path="/" render={(props) => <Dashboard {...props}
                    lawyerObj={this.state.caseObj} 
                    alerts={this.state.alerts}
                    userName={this.state.userName}
                    userRole={this.state.userRole}
                    loggedIn={this.state.loggedIn}
                    displayAllDepositions={this.displayAllDepositions} 
                    setDepId={this.setDepId}
                    dismissAllAlerts={this.dismissAllAlerts}
                    // seeAllAlerts={this.seeAllAlerts}
                  /> }
                  />
                </Switch>
              </div>
            </If>
          </Layout>
        </div>
      </HashRouter>
    );
  }
}


export default App;
