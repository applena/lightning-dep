import React from 'react';
import '../depositions.scss';
import $ from 'jquery';
import If from '../../library/If';
import { Link } from 'react-router-dom';

class OneDeposition extends React.Component{
  constructor(props) {
    super(props);

    // props: caseFiles, userName, id, and displayAllDepositions (the 'go back' button)

    // find the case and the deposition
    this.props.caseFiles.forEach(file => {
      const depFiles = file.depositions.filter(dep => dep.id === this.props.depId);

      if(!depFiles.length){
        return;
      }

      // find the case
      
      // find the plantiff and defendent lawyers
      const lawyersNotAttendingPlantiff = [];
      const lawyersAttendingPlantiff = [];
      
      file.plantiffLawyers.forEach(lawyer => {
        if(depFiles[0].notAttending.includes(lawyer.email)){
          lawyersNotAttendingPlantiff.push(lawyer);
        } else {
          lawyersAttendingPlantiff.push(lawyer);
        };
      });
      
      lawyersNotAttendingPlantiff.map(lawyer => `${lawyer.firstName} ${lawyer.lastName}`)
      
      const lawyersNotAttendingDefendent = [];
      const lawyersAttendingDefendent = [];
      file.defendentLawyers.forEach(lawyer => {
        if(depFiles[0].notAttending.includes(lawyer.email)){
          lawyersNotAttendingDefendent.push(lawyer);
        } else {
          lawyersAttendingDefendent.push(lawyer);
        };
      });
      
      // plantiff lawyers
      var plantiffLawyers = [];
      lawyersNotAttendingPlantiff.map((lawyer, idx) => {
        return plantiffLawyers.push(
          <li key={idx}>
          <span>X</span><span>{lawyer.firstName} {lawyer.lastName}</span>
        </li>)
      })
      
      lawyersAttendingPlantiff.forEach((lawyer) => {
        return plantiffLawyers.push(
          <li key={lawyer.id}>
          <span>✔️</span><span>{lawyer.firstName} {lawyer.lastName}</span>
        </li>)
      })
      
      // defendent lawyers
      var defendentLawyers = []
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
      
      // get the exhibits
      var exhibits = [];
      depFiles[0].exhibits.map((exhibit, idx) => {
        exhibits.push(
          <li key={idx}>
            <span>{exhibit.name}</span>
            <span>{idx}</span>
            <span>{exhibit.documentType}</span>
            <span>...</span>
          </li>
        )
      })

      // get the documents
      var documents = [];
      if(depFiles[0].documents){
        depFiles[0].documents.map((documents, idx) => {
          documents.push(
            <li key={idx}>
              <span>{documents}</span>
              <span>...</span>
            </li>
          )
        })
      }
    
      this.state = {
        oneDeposition: depFiles[0],
        displayDocuments: false,
        displayExhibits: true,
        showPurchaseModal: false,
        plantiffLawyers: plantiffLawyers,
        defendentLawyers: defendentLawyers,
        caseName: file.name,
        caseNumber: file.caseNumber,
        exhibits: exhibits,
        documents: documents
      };
    })

  }
  

  purchaseModal = () => {
    this.setState({ showPurchaseModal: true });
  }

  closePurchaseModal = () => {
    this.setState({ showPurchaseModal: false });
  }

  displayDocuments = () => {
    let documents = [];

    if(this.state.oneDeposition.documents === null){
      this.state.documents = "no documents available"
    } else {
      this.state.oneDeposition.documents.forEach((doc, idx) => {
        documents.push(
          <li key={idx}>
            <h4>{doc}</h4>
          </li>
        )
      })
    };

    this.setState({
      documents: documents,
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
            <span>{this.state.oneDeposition.date}</span>
            <span id="witness-name">{this.state.oneDeposition.witnessName}</span>
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
        <span>{this.state.oneDeposition.courtReporter.firstName} {this.state.oneDeposition.courtReporter.lastName}</span>
      </div>

      <div id="toggle-display">
        <p onClick={this.displayDocuments}>Doucments</p>
        <p onClick={this.displayExhibits}>Exhibits</p>
      </div>

        <If condition={this.state.displayDocuments}>
            <ul>
              {this.state.documents}
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