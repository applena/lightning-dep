import React from 'react';
import '../depositions.scss';
import $ from 'jquery';
import If from '../../library/If';
import { Link } from 'react-router-dom';

class OneDeposition extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayDocuments: false,
      displayExhibits: true,
      showPurchaseModal: false,
      plantiffLawyers: [],
      defendentLawyers: [],
      caseName: '',
      caseNumber: '',
      exhibits: []
    };
  }

  componentWillMount = () => {
    console.log(this.props)
    this.props.caseFiles.forEach(file => {
      const depFiles = file.depositions.filter(dep => dep.id === this.props.depId)
      if(!depFiles.length){
        return;
      }
      console.log('found the file!!!!', file)
      this.setState({ caseName: file.name, caseNumber: file.caseNumber })

      const lawyersNotAttendingPlantiff = [];
      const lawyersAttendingPlantiff = [];

      file.plantiffLawyers.forEach(lawyer => {
        if(this.props.oneDeposition.notAttending.includes(lawyer.email)){
          lawyersNotAttendingPlantiff.push(lawyer);
        } else {
          lawyersAttendingPlantiff.push(lawyer);
        };
      });

      const namesOfLawyersNotAttendingPlantiff = lawyersNotAttendingPlantiff.map(lawyer => `${lawyer.firstName} ${lawyer.lastName}`)

      const lawyersNotAttendingDefendent = [];
      const lawyersAttendingDefendent = [];
      file.defendentLawyers.forEach(lawyer => {
        if(this.props.oneDeposition.notAttending.includes(lawyer.email)){
          lawyersNotAttendingDefendent.push(lawyer);
        } else {
          lawyersAttendingDefendent.push(lawyer);
        };
      });


      // plantiff lawyers
      let plantiffLawyers = [];
      lawyersNotAttendingPlantiff.map((lawyer, idx) => {
        plantiffLawyers.push(
        <li key={idx}>
          <span>X</span><span>{lawyer.firstName} {lawyer.lastName}</span>
        </li>)
      })

      lawyersAttendingPlantiff.forEach((lawyer) => {
        plantiffLawyers.push(
        <li key={lawyer.id}>
          <span>✔️</span><span>{lawyer.firstName} {lawyer.lastName}</span>
        </li>)
      })

      this.setState({ plantiffLawyers: plantiffLawyers });
    
      // defendent lawyers
      let defendentLawyers = []
      lawyersNotAttendingDefendent.map((lawyer, idx) => {
        defendentLawyers.push(<li key={idx}>
          <span>X</span><span>{lawyer}</span>
        </li>)
      })

      lawyersAttendingDefendent.forEach((lawyer) => {
        defendentLawyers.push(<li key={lawyer.id}>
          <span>✔️</span><span>{lawyer.firstName} {lawyer.lastName}</span>
        </li>)
      })

      this.setState({ defendentLawyers: defendentLawyers  });
    })

    let exhibits = [];
    this.props.exhibits.map((exhibit, idx) => {
      exhibits.push(
        <li key={idx}>
          <span>{exhibit.name}</span>
          <span>{idx}</span>
          <span>{exhibit.documentType}</span>
          <span>...</span>
        </li>
      )
    })

    this.setState({ exhibits: exhibits })
  }

  purchaseModal = () => {
    this.setState({ showPurchaseModal: true });
  }

  closePurchaseModal = () => {
    this.setState({ showPurchaseModal: false });
  }

  displayDocuments = () => {
    if(this.props.oneDeposition.documents === null){
      this.props.documents = "no documents available"
    } else {
      this.props.oneDeposition.documents.forEach((doc, idx) => {
        this.props.documents.push(
          <li key={idx}>
            <h4>document info goes here</h4>
          </li>
        )
      })
    };

    this.setState({
      displayDocuments: true,
      displayExhibits: false
    })
  }

  displayExhibits = () => {

    this.setState({
      displayDocuments: false,
      displayExhibits: true
    })
  }

  processPayment = () => {
    // call server to get session ID
    let serverURL = "";
    $.getJSON(`${serverURL}/checkoutSessionId`, function(checkoutSessionId) {
      var stripe = window.Stripe('pk_test_rmguZ1IdJrE01JOAs4bgz8Mj005tMPrNc3');
      stripe.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: checkoutSessionId
      }).then(function (result) {
        console.log(result);
  
        // result.error.message;
      }).catch(error => {
        console.error(error);
      })
    });
      
  }

  render(){
    return(
      <div id="one-deposition">
        <Link to="/depositions"><span onClick={this.props.displayAllDepositions} className="border-bottom">&lt; Depositions</span></Link>
        <div className="felx-container border-bottom">
          <div>
            <span>{this.props.oneDeposition.date}</span>
            <span id="witness-name">{this.props.oneDeposition.witnessName}</span>
          </div>
          <a id="rough-transcript" href="">Download rough transcript</a>
        </div>
        
        <div className="felx-container">
          <div id="dep-details">
            <p>Represented by</p>
            <h4>{this.props.userName}</h4>
            <p>{this.state.caseNumber}</p>
            <h4>{this.state.caseName}</h4>

            <div>Attending</div>
            <div className="flex-container">
              <ul>
                {this.state.plantiffLawyers}
              </ul>
              <ul>
                {this.state.defendentLawyers}
              </ul>
            </div>
          </div>



          <div onClick={this.purchaseModal} id="purchase">
            <div>
              <span>📄 Transcript</span> 
              <span>~$300 - $390</span>
            </div>
            <div>
              <span>📹 Video</span>
              <span>~$200</span>
            </div>
          </div>

          <If condition={this.state.showPurchaseModal}>
            <div id="buy">
              <span onClick={this.closePurchaseModal}>X</span>
              <button onClick={this.processPayment}>BUY</button>
            </div>
          </If>


        </div>
      <div id="court-reporter">
        <p>Court Reporter</p>
        <span>{this.props.oneDeposition.courtReporter.firstName} {this.props.oneDeposition.courtReporter.lastName}</span>
      </div>

      <div id="toggle-display">
        <p onClick={this.displayDocuments}>Doucments</p>
        <p onClick={this.displayExhibits}>Exhibits</p>
      </div>

        <If condition={this.state.displayDocuments}>
            <ul>
              {this.props.documents}
            </ul>
        </If>

        <If condition={this.state.displayExhibits}>
            <ul>
              {this.state.exhibits}
            </ul>
        </If>

      </div>
    )}
}

export default OneDeposition;