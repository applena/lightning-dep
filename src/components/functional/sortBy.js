const sortBy = (startDate, endDate, current, array) => {
  
  //sorts the items by start date, end date and current, or past and the array
  let filteredArray = [];
  if(current === 'all'){
    return filteredArray = array.filter(log => {
      console.log('month', new Date(log.date), startDate)
      return (new Date(log.date) > startDate) && (new Date(log.date) < endDate)
    })
  } else {
    if(current === 'upcoming'){
      return filteredArray = array.filter(log => log.isActive === false);
    }
  
    if(current === 'past'){
      return filteredArray = array.filter(log => log.isActive === true);
    }
  
    filteredArray.sort((a, b) => {
      if(a.data < b.date) return -1;
      else return 1;
    })  
  }
  
  console.log('in the functional component', filteredArray)
  return filteredArray;
}

export default sortBy;