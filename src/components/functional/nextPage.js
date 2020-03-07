function NextPage(arr, i){
  return arr.filter((value, index) => i > index && i <= index + 10);
}

export default NextPage;