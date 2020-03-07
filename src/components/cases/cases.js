import React from 'react';
import TimeDropDown from '../library/timeDropDown';
import './cases.scss';
import { Link } from 'react-router-dom';
import NextPage from '../functional/nextPage';  
import search from '../functional/search';

class Cases extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      visibleCasesArray:this.props.lawyerObj.cases,
      index: 0
    }

    this.updateCasesArraySorted(this.props.lawyerObj.cases)
    
  }

  updateCasesArraySorted = (array) => {
    this.setState({ visibleCasesArray: array })
  }

  displayNextPage = () => {
    let nextPage = NextPage(this.props.lawyerObj.cases, this.state.index);
    this.setState({
      index: this.state.index + 10,
      visibleCasesArray: nextPage
    })
  }

  runSearch = (e) => {
    e.preventDefault();
    let searchResluts = search(e, this.state.visibleCasesArray);
    this.setState({ visibleCasesArray: searchResluts });
  }

  render(){
    
    return(
      <div id="cases">
          <h4>Cases</h4>
          <Link to='/createDeposition'>Create Case</Link>
          <div>
            <span>Active</span>
            <span>Past</span>
          </div>
            <TimeDropDown 
              array={this.props.lawyerObj.cases} 
              sortArray={this.updateCasesArraySorted}
          />
            <form onSubmit={this.runSearch}>
              <input name="search" placeholder="Search"></input>
            </form>
       

          <div id='all-cases'>
            <div className="flex-container headings">
              <span>Name</span>
              <span>Case Number</span>
              <span>Court</span>
              <span>Depositions</span>
              <span></span>
            </div>
            
            <div className="flex-container caseFiles">
              <ul>
              {this.state.visibleCasesArray.map((file, idx) => (
                <Link to={`/cases/${file.case.id}`}>
                  <li className="table-container" key={idx}>
                    <span>{file.case.name}</span>
                    <span>{file.case.caseNumber}</span>
                    <span>{file.case.court}</span>
                    <span>{file.depositions.length}</span>
                    <span>...</span>
                  </li>
                </Link>
              ))}
              </ul>
            </div>
            <button onClick={this.displayNextPage}>next</button>
          </div>
        


      </div>
    )
  }
}

export default Cases;