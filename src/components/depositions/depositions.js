import React from 'react';
import TimeDropDown from '../library//timeDropDown';
import './depositions.scss';
import If from '../library/If';
import sortBy from '../functional/sortBy';
import { Link } from 'react-router-dom';
import NextPage from '../functional/nextPage';
import search from '../functional/search';

class Depositions extends React.Component{
  constructor(props) {
    super(props);

    
    this.state = {
      depositionsArray: [],
      upcomingDepositions: [],
      pastDepositions: [],
      visibleDepositionsArray: [],
      items: []
    };
  }

  componentDidMount = () => {
    const script = document.createElement("script");
  
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
  
    document.body.appendChild(script);
  
    this.props.lawyerObj.cases.forEach(file=> {
      this.state.depositionsArray.push(...file.depositions)
    })
  
    this.updateDepositionArraySorted(this.state.depositionsArray);
  }

  updateDepositionArraySorted = (array) => {
    this.setState({ visibleDepositionsArray: array })
  }

  displayUpcoming = () => {
    let endDate = Date.now();
    let beginning = new Date('1970-01-01');

    let sortedArray = sortBy(beginning, endDate, 'upcoming', this.state.depositionsArray);
    this.updateDepositionArraySorted(sortedArray);
  }

  displayPast = () => {
    let endDate = Date.now();
    let beginning = new Date('1970-01-01');

    let sortedArray = sortBy(beginning, endDate, 'past', this.state.depositionsArray);
    this.updateDepositionArraySorted(sortedArray);
  }

  displayNextPage = () => {
    let nextPage = NextPage(this.state.depositionsArray, this.state.index);
    this.setState({
      index: this.state.index + 10,
      visibleDepositionsArray: nextPage
    })
  }

  runSearch = (e) => {
    e.preventDefault();
    let searchResults = search(e, this.state.visibleDepositionsArray);
    this.setState({ visibleDepositionsArray: searchResults })
  }

    
  render(){
    // console.log('depositions array length', this.state.depositionsArray.length);
    // console.log('visible dep array length', this.state.visibleDepositionsArray);

      return(
        <>
          <If condition={this.props.displayAllDepositions}>
            <div id="depositions">
              <div className="flex-container header">
                <h4>Depostions</h4>
                <Link className="createDep" to="/createDeposition">Create Deposition</Link>
              </div>

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
                  <form onSubmit={this.runSearch}>
                    <input type="text" name="search" defaultValue="Search"></input>
                  </form>
                </div>

              </div>

              <div className='felx-container headers'>
                <span>Name</span>
                <span>Schedule</span>
                <span>Court Reporter</span>
                <span>Owner</span>
                <span> </span>
              </div>
              <ul>
                {this.state.visibleDepositionsArray.map((deposition, idx) => 
                <li data-index={idx} key={idx}>
                  <Link className="table-container" to={`/depositions/${deposition.id}`}>
                    <span className="witness">{deposition.witnessName}</span>
                    <span className="schedule date">{deposition.date.slice(28)} <br />{new Date(deposition.date).toDateString()}</span>
                    <span className="court-reporter">{deposition.courtReporter.firstName} {deposition.courtReporter.lastName}</span>
                    <span className="owner">owner</span>
                    <span className="more-dots">...</span>
                  </Link>
                </li>
                )}
              </ul>
              <button onClick={this.displayNextPage}>next</button>
            </div>
          </If>
        </>
    )
  }
}

export default Depositions;