import React from 'react';
import './timeDropDown.scss';
import If from './If';
import sortBy from '../functional/sortBy';

class Dropdown extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayCustomDate: false
    }
  }

  componentDidMount = () => {
    let thisYear = document.getElementById('this-year');
    thisYear.dispatchEvent(new Event("change", { bubbles: true }));
  }

  updateValue = (e) => {
    if(e.target.value === "Custom"){
      //display hidden field with start date and end dates
      this.setState({ displayCustomDate: true });

    } else {
      this.setState({ displayCustomDate: false });
      let beginningDate = new Date('1950-01-01');
      let currentYear = new Date().getYear() + 1900;
      let currentDay = new Date().getDate();
      let currentMonth = new Date().getMonth() + 1;
      let endDate = new Date();
      let sortedArray = [];

      switch(e.target.value) {
        case 'This-Year':
          
          // jan 1st of this year
          let startDate = new Date(new Date().getFullYear(), 0, 1)

          sortedArray = sortBy(startDate, new Date(), 'all', this.props.array);

          break;
        case 'All':

          sortedArray = sortBy(beginningDate, new Date(), 'all', this.props.array)
          break;
        case 'Upcoming':

          sortedArray = sortBy(beginningDate, new Date(), 'upcoming', this.props.array);
          break;
        case 'Past':

          sortedArray = sortBy(beginningDate, endDate, 'past', this.props.array);
          break;
        case 'This-Month':

          let monthStartDate = new Date().getMonth()

          sortedArray = sortBy(monthStartDate, endDate, 'all', this.props.array);
          break;

        case 'Last-Year':
          let lastYearStartDate = new Date(new Date().getFullYear() - 1, 0, 1)
          let lastYearEndDate = new Date(new Date().getFullYear() - 1, 11, 31)
          sortedArray = sortBy(lastYearStartDate, lastYearEndDate, 'all', this.props.array );
          break;
        default:
          sortedArray = sortBy(startDate, endDate, 'all', this.props.array);
      }
      console.log({sortedArray});
      this.props.sortArray(sortedArray);
    }
  }

  sortCustomDate = (e) => {
    e.preventDefault();
    let startDate = e.target.startDate.value;
    let endDate = e.target.endDate.value;
    let sortedArray = sortBy(startDate, endDate, 'all', this.props.array);
    this.props.sortArray(sortedArray);
  }


  render(){
    return(
      <>
        <select id="time-drop-down" onChange={this.updateValue} name="sort-cases">
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
          <option value="This-Month">This Month</option>
          <option id="this-year" defaultValue="selected" selected="selected" value="This-Year">This Year</option>
          <option value="Last-Year">Last Year</option>
          <option value="Custom">Custom</option>
        </select>

        <If condition={this.state.displayCustomDate}>
          <form onSubmit={this.sortCustomDate}>
            <input type="date" name="startDate" defaultValue="startDate"></input>
            <input type="date" name="endDate" defaultValue="endDate"></input>
            <button>submit</button>
          </form>
        </If>
      </>
    )
  }
}

export default Dropdown;