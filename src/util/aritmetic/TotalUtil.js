const getTotal = (counts = []) => {
  let total = 0
  if(counts.length > 0){
    total = counts.reduce((total, count) => total + Number(count.discount), 0)
  }
  return Number(total).toFixed(2);
}

export {  getTotal }