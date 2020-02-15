import React from 'react';
import './App.scss';
import Layout from './components/layout/layout';
import SignUp from './components/signup/signUp';
import Cookie from 'js-cookie';
import If from './components/library/If';
import SideNav from './components/sideNav/sideNav';
import Dashboard from './components/dashboard/dashboard';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Cases from './components/cases/cases';
import Depositions from './components/depositions/depositions';
import cases from './components/functional/caseObj';
import CreateDeposition from './components/cases/oneCase/createDeposition'; 
import OneDeposition from './components/depositions/oneDeposition/oneDeposition';


class App extends React.Component{
  constructor(props) {
    super(props);
    // use jsonwebtoken library to examine the JWT COOKIE, see if it is valid and get the username out of it
    const loggedIn = !!Cookie.get('JWT');

    this.state = {
      loggedIn: true,
      userName: 'bob', // TODO: get this username from the JWT cookie
      showDepositions: true,
      showOneDepostion: false,
      showCases: true,
      showOneCase: false,
      depId: ''
    };
  }

  loggedOut = () => {
    Cookie.set('JWT', null);
    this.setState({loggedIn: false});
  }

  updateUserInfo = (userName) => {
    this.setState({ userName: userName });
  }

  displayAllCases = () => {
    this.setState({
      showCases: true,
      showOneCase: false
    })
  }

  displayOneCase = () => {
    this.setState({
      showCases: false,
      showOneCase: true
    })
  }

  displayAllDepositions = () => {
    this.setState({ 
      showDepositions: true,
      showOneDepostion: false
     })
  }

  // displayOneDeposition = () => {
  //   this.setState({
  //     showDepositions: false,
  //     showOneDepostion: true
  //   })
  // }

  setDepId = (id) => {
    this.setState({ depId: id });
  }

  // componentWillMount = () => {
  //   if(!Cookie.get('JWT')){
  //     this.setState({loggedIn: false})
  //   } else { 
  //     this.setState ({ loggedIn: true })
  //   }
  // }

  render(){

    console.log('am i logged in? ', this.state.loggedIn);


  let alerts = [{title: 'New Document Available', description: '3;17-cv-0019087'}, {title: 'Deposition Transcript Available', description: 'Jane Doe'}, {title: 'Deposition Transcript Available', description: 'John Doe'}]
 console.log('app render')
    return (
      <HashRouter basename='/'>
        <div className="App">
          <Layout>
            <If condition={!this.state.loggedIn}>
              <SignUp updateUserInfo={this.updateUserInfo} />
            </If>
            <If condition={this.state.loggedIn}>
              <div id="dashboard">
                <SideNav 
                  loggOut={this.loggedOut} 
                  userName={this.state.userName}
                  displayAllDepositions={this.displayAllDepositions}
                  displayAllCases={this.displayAllCases}
                />
                <Switch>
                  <Route path="/cases" render={(props) => <Cases {...props}
                    userName={this.state.userName}
                    caseFiles={cases}
                    displayAllCases={this.displayAllCases}
                    displayOneCase={this.displayOneCase}
                    showCases={this.state.showCases}
                    showOneCase={this.state.showOneCase}
                  />} />
                  <Route path="/depositions/:id" render={(props) => <OneDeposition {...props}
                    displayAllDepositions={this.props.displayAllDepositions} 
                    caseFiles={cases}
                    depId={this.state.depId}
                    userName={this.props.userName}
                  />}/>
                  <Route path="/depositions" render={(props) => <Depositions {...props} 
                    userName={this.state.userName}
                    caseFiles={cases} 
                    displayAllDepositions={this.displayAllDepositions}
                    showDepositions={this.state.showDepositions}
                    showOneDepostion={this.state.showOneDepostion}
                    setDepId={this.setDepId}
                  />} />
                  <Route path="/" render={(props) => <Dashboard {...props}
                    cases={cases} 
                    alerts={alerts}
                    userName={this.state.userName}
                    loggedIn={this.state.loggedIn}
                    displayAllDepositions={this.displayAllDepositions} 
                    setDepId={this.setDepId}
                  /> }
                  />
                  <Route path="/createDeposition" render={(props) => <CreateDeposition {...props}
                    
                  />} />
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
