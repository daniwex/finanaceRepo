export const aggregateTable = (data) => {
  let result = {};
  const b = data.budget;
  const s = data.spending;
  for (let i = 0; i < b.length; i++) {
    result[b[i][0]] = [b[i][1], b[i][2]];
  }
  for (let i = 0; i < s[0].length; i++) {
    if (s[0][i][0] in result) {
      result[s[0][i][0]] = [...result[s[0][i][0]], s[0][i][1]];
    }
  }
  return result
};


export const budgetInfo = (data) => {
  // transactions and bugets, needs to be based on the category of the budget
  let result = []
  const obj = {}
  const budgets = data.budget
  const transaction = data.spending[0]
  for(let i=0;i<budgets.length;i++){
    obj[budgets[i][0]] = [budgets[i][0],budgets[i][2], budgets[i][1]]
  } 
  for(let i=0;i<transaction.length;i++){
    if(transaction[i][0] in obj){
      obj[transaction[i][0]] = [...obj[transaction[i][0]] , transaction[i].slice(1)]
    }
  } 
  result.push(obj)  
  return result
}

export const calculateProgress =  (max,arr) => {
  return `${(100 * arr.reduce((agg,init) => agg += init[0], 0)) / max}%`
}

export const calculateSpent = (arr) => {
  return arr.reduce((agg,init) => agg += init[0], 0)
}