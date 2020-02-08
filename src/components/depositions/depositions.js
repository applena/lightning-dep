import React from 'react';
import TimeDropDown from '../library//timeDropDown';
import './depositions.scss';
import $ from 'jquery';
import If from '../library/If';
import sortBy from '../functional/sortBy';

class Depositions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      depositionsArray: [],
      upcomingDepositions: [],
      pastDepositions: [],
      visibleDepositionsArray: [],
      items: [],
      oneDeposition: {},
      displayOneSchedule: "",
      displayOneWitnessName: "",
      displayOneRepresentedBy: "",
      displayOneCaseNumber: "",
      displayOneCaseName: "",
      displayOneCourtReporter: "",
      displayOneCaseNumber: "",
      displayOneDepositionNotAttendingPlantiff: [],
      displayOneDepositionNotAttendingDefendent: [],
      displayOnePlantiffLawyers: [],
      displayOneDefendentLawyers: [],
      showPurchaseModal: false,
      displayDocuments: false,
      displayExhibits: true,
      exhibits: [],
      documents: []
    };
  }

  componentWillMount () {
    const script = document.createElement("script");

    script.src = "https://js.stripe.com/v3/";
    script.async = true;

    document.body.appendChild(script);

    this.props.caseFiles.forEach(file=> {
      this.state.depositionsArray.push(...file.depositions)
    })

    this.updateDepositionArraySorted(this.state.depositionsArray);

  }

  displayOneDep = (idx, id) => {
    let chosenDep = this.state.depositionsArray[idx];
    let courtReporter = `${chosenDep.courtReporter.firstName} ${chosenDep.courtReporter.lastName}`;

    this.setState({ 
      oneDeposition: chosenDep,
      displayOneCourtReporter: courtReporter
    });

    let date = `${chosenDep.date.slice(28)} ${new Date(chosenDep.date).toDateString()}`;

    this.props.caseFiles.forEach(file => {
      const depFiles = file.depositions.filter(dep => dep.id === id)
      if(!depFiles.length){
        return;
      }

      // match up the notAttending deposition lawyers with the lawyers on the case
      // const lawyersNotAttendingPlantiff = file.plantiffLawyers.filter(lawyer => {
      //   return this.state.depositionsArray[idx].notAttending.includes(lawyer.email);
      // });


      const lawyersNotAttendingPlantiff = [];
      const lawyersAttendingPlantiff = [];
      file.plantiffLawyers.forEach(lawyer => {
        if(chosenDep.notAttending.includes(lawyer.email)){
          lawyersNotAttendingPlantiff.push(lawyer);
        } else {
          lawyersAttendingPlantiff.push(lawyer);
        };
      });

      const namesOfLawyersNotAttendingPlantiff = lawyersNotAttendingPlantiff.map(lawyer => `${lawyer.firstName} ${lawyer.lastName}`)

      const lawyersNotAttendingDefendent = [];
      const lawyersAttendingDefendent = [];
      file.defendentLawyers.forEach(lawyer => {
        if(chosenDep.notAttending.includes(lawyer.email)){
          lawyersNotAttendingDefendent.push(lawyer);
        } else {
          lawyersAttendingDefendent.push(lawyer);
        };
      });

      // const lawyersNotAttendingDefendent = file.defendentLawyers.filter(lawyer => {
      //   return this.state.depositionsArray[idx].notAttending.includes(lawyer.email)
      // });

      const namesOfLawyersNotAttendingDefendent = lawyersNotAttendingDefendent.map(lawyer => `${lawyer.firstName} ${lawyer.lastName}`);


      this.setState({ 
        displayOneCaseNumber: file.caseNumber,
        displayOneCaseName: file.name,
        displayOneDepositionNotAttendingDefendent: namesOfLawyersNotAttendingDefendent,
        displayOneDepositionNotAttendingPlantiff: namesOfLawyersNotAttendingPlantiff,
        displayOnePlantiffLawyers: lawyersAttendingPlantiff,
        displayOneDefendentLawyers: lawyersAttendingDefendent
        })
    })


    if(!this.state.oneDeposition.documents === 'null'){
      this.setState = ({ displayDocuments: this.state.oneDeposition.documents });
    }


    if(this.state.oneDeposition.exhibits === 'null'){
      this.setState = ({ displayExhibits: this.state.oneDeposition.exhibits });
    }

    this.props.displayOneDeposition();

    this.setState({ 
      displayOneSchedule: date,
      displayOneWitnessName: chosenDep.witnessName
    });

    // display the exhibits
    if(!chosenDep.exhibits.length){
      this.state.exhibits = "no exhibits available"
    } else {
      chosenDep.exhibits.forEach((exhibit, idx) => {
        this.state.exhibits.push(
          <li key={idx}>
            <span>{exhibit.name}</span>
            <span>{idx}</span>
            <span>{exhibit.documentType}</span>
            <span>🔐</span>
            <span>...</span>
          </li>
        )
      })
    };
  }

  purchaseModal = () => {
    this.setState({ showPurchaseModal: true });
  }

  closePurchaseModal = () => {
    this.setState({ showPurchaseModal: false });
  }

  updateDepositionArraySorted = (array) => {
    this.setState({ visibleDepositionsArray: array })
  }

  displayDocuments = () => {
    if(this.state.oneDeposition.documents === null){
      this.state.documents = "no documents available"
    } else {
      this.state.oneDeposition.documents.forEach((doc, idx) => {
        this.state.documents.push(
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

  displayUpcoming = () => {
    let currentYear = new Date().getYear() + 1900;
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let sortedArray = sortBy('1970-01-01', endDate, 'upcoming', this.state.depositionsArray);
    this.updateDepositionArraySorted(sortedArray);
  }

  displayPast = () => {
    let currentYear = new Date().getYear() + 1900;
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let endDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let sortedArray = sortBy('1970-01-01', endDate, 'past', this.state.depositionsArray);
    this.updateDepositionArraySorted(sortedArray);
  }

  createDeposition = () => {
    // link to create deposition
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
    console.log('depositions array length', this.state.depositionsArray.length);
    console.log('visible dep array length', this.state.visibleDepositionsArray);

      // plantiff lawyers
      let plantiffLawyers = [];
      this.state.displayOneDepositionNotAttendingPlantiff.map((lawyer, idx) => {
        plantiffLawyers.push(<li key={idx}>
          <span>X</span><span>{lawyer}</span>
        </li>)
      })

      this.state.displayOnePlantiffLawyers.forEach((lawyer) => {
        plantiffLawyers.push(<li key={lawyer.id}>
          <span>✔️</span><span>{lawyer.firstName} {lawyer.lastName}</span>
        </li>)
      })
      
      // defendent lawyers
      let defendentLawyers = []
      this.state.displayOneDepositionNotAttendingDefendent.map((lawyer, idx) => {
        defendentLawyers.push(<li key={idx}>
          <span>X</span><span>{lawyer}</span>
        </li>)
      })

      this.state.displayOneDefendentLawyers.forEach((lawyer) => {
        defendentLawyers.push(<li key={lawyer.id}>
          <span>✔️</span><span>{lawyer.firstName} {lawyer.lastName}</span>
        </li>)
      })

      return(
        <>
          <If condition={this.props.showDepositions}>
            <div id="depositions">
              <h4>Depostions</h4>

              <div className="flex-container dep-top">
                <div className="upcomming-past-toggle">
                  <span onClick={this.displayUpcoming}>Upcoming</span>
                  <span onClick={this.displayPast}>Past</span>
                </div>

                <TimeDropDown 
                  array={this.state.depositionsArray} 
                  sortArray={this.updateDepositionArraySorted}
                />

                <div className="flex-container">
                  <button onSubmit={this.createDeposition}>Create Deposition</button>
                  <input type="text" defaultValue="Search"></input>
                </div>

              </div>

              <div className='felx-container'>
                <span>Name</span>
                <span>Schedule</span>
                <span>Court Reporter</span>
                <span>Owner</span>
              </div>
              <ul>
                {this.state.visibleDepositionsArray.map((deposition, idx) => 
                <li onClick={() => this.displayOneDep(idx, deposition.id)} className="flex-container" data-index={idx} key={idx}>
                  <span className="witness">{deposition.witnessName}</span>
                  <span className="schedule">{deposition.date.slice(28)} {new Date(deposition.date).toDateString()}</span>
                  <span className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</span>
                  <span className="owner">owner</span>
                  <span className="more-dots">...</span>
                </li>
                )}
              </ul>
            </div>
          </If>
          <If condition={this.props.showOneDepostion}>
            <div id="one-deposition">
              <h4>Past Depositions - Lawyers</h4>
              <span onClick={this.props.displayAllDepositions} className="border-bottom">&lt; Depositions</span>
              <div className="felx-container border-bottom">
                <div>
                  <span>{this.state.displayOneSchedule}</span>
                  <span id="witness-name">{this.state.displayOneWitnessName}</span>
                </div>
                <a id="rough-transcript" href="">Download rough transcript</a>
              </div>
              
              <div className="felx-container">
                <div id="dep-details">
                  <p>Represented by</p>
                  <h4>{this.props.userName}</h4>
                  <p>{this.state.displayOneCaseNumber}</p>
                  <h4>{this.state.displayOneCaseName}</h4>

                  <div>Attending</div>
                  <div className="flex-container">
                    <ul>
                      {plantiffLawyers}
                    </ul>
                    <ul>
                      {defendentLawyers}
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
              <span>{this.state.displayOneCourtReporter}</span>
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

          </If>
        </>
    )
  }
}

export default Depositions;