function search(e, array){
  const searchTerm = e.target.search.value;
  if(!searchTerm) return array;

  let results = array.filter(obj => {
  
    return JSON.stringify(obj).includes(searchTerm);

  })

  return (results)
}

export default search;